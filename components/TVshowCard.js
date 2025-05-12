import React from 'react'
import Image from 'next/image'

const TVshowCard = ({show}) => {
  return (
    <div className="group relative w-40 sm:w-48 cursor-pointer">
          {/* poster image */}
          <div className="relative pb-[150%] overflow-hidden rounded-lg shadow-lg bg-gray-800">
            <Image
              src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
              alt={show.title}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
    
          {/* hover overlay with play icon */}
          <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
    
          {/* title & meta */}
          <div className="mt-2 text-white">
            <h3 className="text-sm font-semibold line-clamp-2">{show.name}</h3>
            <p className="text-xs text-gray-400">{show.first_air_date || "–"}</p>
            <div className="mt-1 flex items-center text-xs">
              <span className="inline-block bg-yellow-500 text-black px-1 rounded">
                {show.vote_average.toFixed(1)}
              </span>
              <span className="ml-1 text-gray-400">({show.vote_count})</span>
            </div>
          </div>
        </div>
  )
}

export default TVshowCard