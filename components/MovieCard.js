import React from "react";
import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="group relative w-40 sm:w-48 cursor-pointer">
      {/* poster image */}
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          width={600}
          height={200}
          className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* title & meta */}
      <div className="mt-2 text-white">
        <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-gray-400">{movie.release_date}</p>
        <div className="mt-1 flex items-center text-xs">
          <span className="inline-block bg-yellow-500 text-black px-2 py-1 rounded">
            {movie.vote_average?.toFixed(1)}
          </span>
          <span className="ml-1 text-gray-400">({movie.vote_count})</span>
        </div>
      </div>
    </div>
  );
}