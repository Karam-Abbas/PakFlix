import useSWR from "swr";
import MovieCard from "@/components/MovieCard";
import TVshowCard from "@/components/TVshowCard";
import { useEffect, useState } from "react";

export default function Home(props) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error} = useSWR('/api/content',fetcher)
    if (error) return <p className="text-red-500">Failed to load movies.</p>;
    if (!data) return <p>Loading…</p>;
  
    const {movies,TVshows} = data

    return (
      <div className="bg-black min-h-screen pb-10">
        {/* Header section */}
        <div className="relative h-[70vh] w-full bg-gradient-to-b from-transparent to-black">
          {/* Hero image - use a featured movie backdrop */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`,
              opacity: 0.6
            }}
          />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 p-12 w-1/2">
            <h1 className="text-5xl font-bold text-white mb-4">{movies[0]?.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{movies[0]?.overview?.substring(0, 150)}...</p>
            <button className="bg-red-600 text-white py-2 px-8 rounded hover:bg-red-700 transition">
              Watch Now
            </button>
          </div>
        </div>
        
        {/* Content rows */}
        <div className="px-12 -mt-10">
          {/* Movies row */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Trending Movies</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {movies.map((m) => (
                <div key={m.id} className="flex-none">
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          </div>
          
          {/* TV Shows row */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Popular TV Shows</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {TVshows.map((tvs) => (
                <div key={tvs.id} className="flex-none">
                  <TVshowCard show={tvs} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }