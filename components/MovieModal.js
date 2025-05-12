"use client"

import { useEffect, useState, useRef } from "react"
import styles from "./MovieModal.module.css"

export default function MovieModal({ children, open, onClose, movieId }) {
  const [videoKey, setVideoKey] = useState(null)
  const [clipKey, setClipKey] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)
  const [logoUrl, setLogoUrl] = useState(null)
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState(null)
  const [writers, setWriters] = useState([])
  const [showTrailer, setShowTrailer] = useState(false)
  const trailerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const headers = {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const clip = data.results.find((v) => v.type === "Clip" && v.site === "YouTube")
        const trailer = data.results.find((v) => v.type === "Trailer" && v.site === "YouTube")
        if (clip) {
          setClipKey(clip.key)
          setVideoKey(clip.key)
        }
        if (trailer) setTrailerKey(trailer.key)
      })

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, { headers })
      .then((res) => res.json())
      .then(setMovieDetails)

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const logo = data.logos.find((l) => l.iso_639_1 === "en")
        if (logo) setLogoUrl(`https://image.tmdb.org/t/p/original${logo.file_path}`)
      })

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const topCast = data.cast.filter((m) => m.order >= 0 && m.order <= 3).slice(0, 4)
        setCast(topCast)

        const director = data.crew.find((m) => m.job === "Director")
        if (director) setDirector(director.name)

        const writerJobs = ["Writer", "Screenplay", "Story", "Author"]
        const writerList = data.crew.filter((m) => writerJobs.includes(m.job)).map((m) => m.name)
        setWriters([...new Set(writerList)])
      })
  }, [open, movieId])

  const playTrailerFullscreen = () => {
    setVideoKey(null)
    setShowTrailer(true)

    setTimeout(() => {
      if (trailerRef.current?.requestFullscreen) {
        trailerRef.current.requestFullscreen()
      }
    }, 100)
  }

  const closeTrailer = () => {
    setShowTrailer(false)
    setVideoKey(clipKey)
  }

  const add = async () => {
    try {
      const response = await fetch('/api/user/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie to list');
      }

      const data = await response.json();
      alert('Movie added to your list!');
    } catch (error) {
      console.error('Error adding movie to list:', error);
      alert('Failed to add movie to list. Please try again.');
    }
  }

  useEffect(() => {
    if (!open) {
      setShowTrailer(false)
    }
  }, [open])

  if (!open) return null

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["modal-close-button"]} onClick={onClose}>
          ×
        </button>

        {movieDetails && (
          <>
            {videoKey && (
              <div className={styles["modal-video-container"]}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                  title="Clip"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className={styles["modal-details"]}>
              {logoUrl ? (
                <img src={logoUrl || "/placeholder.svg"} alt="Movie Logo" className={styles["movie-logo"]} />
              ) : (
                <h1 className={styles["movie-title"]}>{movieDetails.title}</h1>
              )}

              <div className={styles["modal-actions"]}>
                {trailerKey && (
                  <button className={styles["play-button"]} onClick={playTrailerFullscreen}>
                    <span className={styles["play-icon"]}>▶</span>
                    Play
                  </button>
                )}
                <button onClick={add} className={`${styles["round-button"]} ${styles["add-button"]}`}>+</button>
              </div>

              <div className={styles["movie-meta"]}>
                <span className={styles["movie-year"]}>{new Date(movieDetails.release_date).getFullYear()}</span>
                <span className={styles["movie-runtime"]}>
                  {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
                </span>
                <span className={styles["movie-rating"]}>16+</span>
              </div>

              <p className={styles["movie-overview"]}>{movieDetails.overview}</p>

              {cast.length > 0 && (
                <div className={styles["movie-cast"]}>
                  <span className={styles["label"]}>Cast: </span>
                  {cast.map((actor, index) => (
                    <span key={actor.id}>
                      {actor.name}
                      {index < cast.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {cast.length > 0 && <span className={styles["more-link"]}>, more</span>}
                </div>
              )}

              <h2 className={styles["section-title"]}>About {movieDetails.title}</h2>

              {director && (
                <div className={styles["movie-director"]}>
                  <span className={styles["label"]}>Director: </span>
                  <span>{director}</span>
                </div>
              )}

              {writers.length > 0 && (
                <div className={styles["movie-writers"]}>
                  <span className={styles["label"]}>Writer{writers.length > 1 ? "s" : ""}: </span>
                  {writers.map((writer, index) => (
                    <span key={index}>
                      {writer}
                      {index < writers.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              {movieDetails.genres.length > 0 && (
                <div className={styles["movie-genres"]}>
                  <span className={styles["label"]}>Genres: </span>
                  {movieDetails.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < movieDetails.genres.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {children}
      </div>

      {showTrailer && (
        <div ref={trailerRef} className={styles["video-player-overlay"]}>
          <button className={styles["video-close-button"]} onClick={closeTrailer}>
            ×
          </button>
          <div className={styles["video-player-container"]}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
