"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./TVShowModal.module.css"; // Updated import

export default function TVShowModal({ open, onClose, tvShowId }) {
  const [tvShowData, setTvShowData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [seasonEpisodeCounts, setSeasonEpisodeCounts] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const fetchTVShowData = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
          },
        });
        const showData = await res.json();
        setTvShowData(showData);

        const episodeCounts = {};
        for (let i = 1; i <= showData.number_of_seasons; i++) {
          const seasonRes = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/season/${i}`,
            {
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
              },
            }
          );
          const seasonData = await seasonRes.json();
          episodeCounts[i] = seasonData.episodes?.length || 0;
        }
        setSeasonEpisodeCounts(episodeCounts);
      } catch (err) {
        console.error("Error fetching TV show data:", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
            },
          }
        );
        const data = await res.json();
        const clip =
          data.results.find((v) => v.type === "Clip" && v.site === "YouTube") ||
          data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) ||
          data.results[0];

        if (clip) {
          setVideoKey(clip.key);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchTVShowData();
    fetchVideos();
  }, [tvShowId, open]);

  useEffect(() => {
    if (!open || !tvShowId) return;

    const fetchSeasonData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/season/${selectedSeason}`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
            },
          }
        );
        const seasonData = await res.json();
        setEpisodes(seasonData.episodes || []);
      } catch (err) {
        console.error("Error fetching season data:", err);
      }
    };

    fetchSeasonData();
  }, [tvShowId, open, selectedSeason]);

  useEffect(() => {
    if (!open) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/season/${selectedSeason}/episode/1/images`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmRkYzUyNTlkNmNlZGVhZGJlYjdhN2IzNmFkYTM2OCIsIm5iZiI6MTc0NjIxODY0NS4wMDgsInN1YiI6IjY4MTUyZTk1OWQ4ZTE2NTNjMDkwN2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Whfe9g7a-Ina6pYDhh1C89OXUZ2YKjuFQ-DFP9DYpKg",
            },
          }
        );
        const imageData = await res.json();
        setImages(imageData.stills || []);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, [tvShowId, open, selectedSeason]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setShowSeasonDropdown(false);
  };

  const handlePlayClick = () => {
    if (videoKey) {
      setIsPlaying(true);
    }
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSeasonDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const add = async () => {
    try {
      const response = await fetch("/api/user/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tvShowId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie to list");
      }

      const data = await response.json();
      alert("Movie added to your list!");
    } catch (error) {
      console.error("Error adding movie to list:", error);
      alert("Failed to add movie to list. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className={styles["tv-modal-overlay"]}>
      <div className={styles["tv-modal-content"]}>
        <button className={styles["tv-modal-close-button"]} onClick={onClose}>
          ×
        </button>

        {isPlaying && videoKey && (
          <div className={styles["video-player-overlay"]}>
            <button
              className={styles["video-close-button"]}
              onClick={handleCloseVideo}
            >
              ×
            </button>
            <div className={styles["video-player-container"]}>
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {!tvShowData ? (
          <div className={styles["tv-modal-loading"]}>Loading...</div>
        ) : (
          <>
            <div className={styles["tv-modal-backdrop"]}>
              {tvShowData.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${tvShowData.backdrop_path}`}
                  alt={tvShowData.name}
                />
              )}
              <div className={styles["tv-modal-title-overlay"]}>
                <h1 className={styles["tv-show-title"]}>{tvShowData.name}</h1>
              </div>
            </div>

            <div className={styles["tv-modal-body"]}>
              <div className={styles["tv-modal-actions"]}>
                <button
                  className={styles["play-button"]}
                  onClick={handlePlayClick}
                >
                  <span className={styles["play-icon"]}>▶</span>
                  Play
                </button>
                <button
                  onClick={add}
                  className={`${styles["round-button"]} ${styles["check-button"]}`}
                >
                  +
                </button>
              </div>

              <div className={styles["tv-show-meta"]}>
                <span className={styles["tv-show-year"]}>
                  {tvShowData.first_air_date?.substring(0, 4)}
                </span>
                <span className={styles["tv-show-seasons"]}>
                  {tvShowData.number_of_seasons} Seasons
                </span>
              </div>

              <p className={styles["tv-show-overview"]}>
                {tvShowData.overview}
              </p>

              <div className={styles["tv-show-info"]}>
                <div className={styles["tv-show-cast"]}>
                  <span className={styles["label"]}>Cast: </span>
                  {tvShowData.created_by?.map((creator, index) => (
                    <span key={creator.id}>
                      {creator.name}
                      {index < tvShowData.created_by.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  <span className={styles["more-link"]}>, more</span>
                </div>

                <div className={styles["tv-show-genres"]}>
                  <span className={styles["label"]}>Genres: </span>
                  {tvShowData.genres?.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < tvShowData.genres.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <div className={styles["tv-show-mood"]}>
                  <span className={styles["label"]}>This Show Is: </span>
                  <span>Heartfelt, Emotional</span>
                </div>
              </div>

              <div className={styles["tv-episodes-section"]}>
                <h2 className={styles["episodes-title"]}>Episodes</h2>

                <div className={styles["season-selector"]} ref={dropdownRef}>
                  <button
                    className={styles["netflix-season-dropdown-button"]}
                    onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                  >
                    Season {selectedSeason}
                    <span className={styles["dropdown-arrow"]}>▼</span>
                  </button>

                  {showSeasonDropdown && (
                    <div className={styles["netflix-season-dropdown-menu"]}>
                      {[...Array(tvShowData.number_of_seasons || 1)].map(
                        (_, i) => (
                          <div
                            key={i + 1}
                            className={styles["netflix-season-option"]}
                            onClick={() => handleSeasonChange(i + 1)}
                          >
                            <span className={styles["season-label"]}>
                              Season {i + 1}
                            </span>
                            {seasonEpisodeCounts[i + 1] > 0 && (
                              <span className={styles["episode-count"]}>
                                ({seasonEpisodeCounts[i + 1]} Episode
                                {seasonEpisodeCounts[i + 1] !== 1 ? "s" : ""})
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className={styles["episodes-list"]}>
                  {episodes.map((episode) => (
                    <div key={episode.id} className={styles["episode-item"]}>
                      <div className={styles["episode-number"]}>
                        {episode.episode_number}
                      </div>
                      <div className={styles["episode-thumbnail"]}>
                        {episode.still_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                            alt={episode.name}
                          />
                        ) : (
                          <div
                            className={styles["episode-thumbnail-placeholder"]}
                          ></div>
                        )}
                      </div>
                      <div className={styles["episode-details"]}>
                        <div className={styles["episode-title-row"]}>
                          <h3 className={styles["episode-title"]}>
                            {episode.name}
                          </h3>
                          <span className={styles["episode-duration"]}>
                            {episode.runtime ? `${episode.runtime}m` : "43m"}
                          </span>
                        </div>
                        <p className={styles["episode-overview"]}>
                          {episode.overview}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
