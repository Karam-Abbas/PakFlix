import React from "react";
import { useState } from "react";
import Head from "next/head";
import YouTube from "react-youtube";

const MovieDescription = (props) => {
  const [movie, SetMovie] = useState(props.movie);
  // state for index to iterate through keys for YouTube Playback
  const [index, SetIndex] = useState(0);
  // state to store the flag of video playing
  const [isPlaying, setIsPlaying] = useState(false);
  // state to save keys
  const [videoKeys, setVideoKeys] = useState([]);
  // Calculate backdrop path
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  async function WatchStream(id) {
    const data = await fetch(`/api/movie/${id}`).then((res) => res.json());

    if (!data) {
      throw new Error("Failed to fetch videos");
    }
    const keys = await data
      .filter((m) => {
        return m.site === "YouTube";
      })
      .filter((m) => m.size === 1080)
      .map((m) => m.key);

    if (keys.length > 0) {
      setVideoKeys(keys);
      setIsPlaying(true);
    } else {
      alert("No videos available for this movie");
    }
  }
  function handleEnd() {
    if (index < videoKeys.length - 1) {
      SetIndex(index + 1);
    } else {
      setIsPlaying(false);
      SetIndex(0);
    }
  }

  return (
    <>
      <Head>
        <title>{movie.title} | PAKFlix</title>
      </Head>

      <div className="relative min-h-screen bg-black text-white">
        {/* Hero backdrop image */}
        {backdropUrl && (
          <div className="absolute top-0 left-0 w-full h-[70vh] z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-24">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <div className="flex-shrink-0 md:mr-8 mb-6 md:mb-0">
              <div className="rounded-md overflow-hidden shadow-2xl w-48 md:w-64 bg-gray-800 relative">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="w-full h-full aspect-[2/3] bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-500">No poster available</span>
                  </div>
                )}
              </div>

              {/* Rating badge */}
              {movie.vote_average > 0 && (
                <div className="mt-4 flex items-center">
                  <div className="bg-red-600 text-white font-bold text-sm px-3 py-1 rounded-sm">
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(movie.vote_average / 2)
                            ? "text-red-500"
                            : "text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}

              {/* Watch Now button */}
              <button
                onClick={() => WatchStream(movie.id)}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded flex items-center justify-center transition duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Now
              </button>
            </div>

            {/* Movie details */}
            <div className="flex-1 md:pt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center text-sm mb-6">
                <span className="mr-4">
                  {movie.release_date?.substring(0, 4)}
                </span>
                {movie.runtime && (
                  <span className="mr-4">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                {movie.adult && (
                  <span className="bg-red-700 text-white px-1 py-0.5 text-xs rounded mr-2">
                    18+
                  </span>
                )}
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
              </div>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {movie.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {movie.genres && movie.genres.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Genres</h3>
                    <p className="text-white">
                      {movie.genres.map((g) => g.name).join(", ")}
                    </p>
                  </div>
                )}

                {movie.production_companies &&
                  movie.production_companies.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-400 mb-2">
                        Production
                      </h3>
                      <p className="text-white">
                        {movie.production_companies
                          .map((c) => c.name)
                          .join(", ")}
                      </p>
                    </div>
                  )}

                {movie.spoken_languages &&
                  movie.spoken_languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-400 mb-2">
                        Languages
                      </h3>
                      <p className="text-white">
                        {movie.spoken_languages
                          .map((l) => l.english_name)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                {
                  <div className="flex justify-center items-center p-4">
                    {/* YouTube player modal */}
                    {isPlaying && videoKeys.length > 0 && (
                      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                        <div className="relative max-w-4xl w-full">
                          <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute -top-10 right-0 text-white hover:text-red-500"
                          >
                            Close ×
                          </button>
                          <YouTube
                            videoId={videoKeys[index]}
                            opts={{
                              width: "100%",
                              height: "500",
                              playerVars: { autoplay: 1 },
                            }}
                            onEnd={handleEnd}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDescription;

export async function getServerSideProps(context) {
  const { id } = context.params;
  // Use the absolute URL based on the current request
  // This works in both development and production
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/movie/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mid: id }),
  });

  const data = await res.json();

  return {
    props: {
      movie: data.body,
    },
  };
}
