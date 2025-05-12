import React from "react";
import Image from "next/image";
import Link from "next/link";

const SearchContents = ({ item }) => {
  const results = item && item.results ? item.results : [];

  if (results.length === 0) {
    return null;
  }
  console.log(results[0].id);
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-95 rounded-md shadow-2xl max-h-[80vh] overflow-y-auto z-50 border border-gray-800">
      <div className="p-3 border-b border-gray-800">
        <p className="text-gray-300 text-sm font-medium">Search Results</p>
      </div>
      <ul className="divide-y divide-gray-800">
        {results.map((item) => (

          <li
            key={item.id}
            className="group hover:bg-gray-900 transition-all duration-200 px-2 py-2"
          >
            <Link href={`/auth/${item.id}`} className="flex flex-row items-center justify-center gap-3">
            {/* Poster Image */}
            <div className="flex-shrink-0 w-16 h-24 bg-gray-900 rounded overflow-hidden relative group-hover:shadow-lg transition-all duration-200">
              {item.poster_path ? (
                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={item.title || item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-red-900 bg-opacity-40">
                  <svg
                    className="w-10 h-10 text-red-600 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm7 2h3a1 1 0 010 2h-3a1 1 0 110-2zm-6 8a1 1 0 100-2 1 1 0 000 2zm7-6a1 1 0 100-2 1 1 0 000 2zm4 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="flex-1 pt-2">
              <div>
              <p className="text-white font-medium group-hover:text-red-600 transition-colors duration-200">
                {item.title || item.name}
              </p>

              {/* Meta Information */}
              <div className="flex items-center mt-1 text-xs">
                {/* Media Type Badge */}
                <span
                  className={`px-1.5 py-0.5 rounded-sm text-[10px] font-medium uppercase tracking-wide ${
                    item.media_type === "movie"
                      ? "bg-red-800 text-red-100"
                      : "bg-blue-800 text-blue-100"
                  }`}
                >
                  {item.media_type === "movie" ? "Movie" : "TV Show"}
                </span>

                {/* Year */}
                {(item.release_date || item.first_air_date) && (
                  <span className="ml-2 text-gray-400">
                    {(item.release_date || item.first_air_date).substring(0, 4)}
                  </span>
                )}
                </div>
                <div className="pt-2">
                {/* Rating */}
                {item.vote_average > 0 && (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-300">
                        {item.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
            </Link>
          </li>

        ))}
      </ul>
      {/* Footer with total results count */}
      <div className="p-3 border-t border-gray-800 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {results.length} results found
        </span>
      </div>
    </div>
  );
};

export default SearchContents;
