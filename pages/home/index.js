import useSWR from "swr";
import MovieCard from "@/components/MovieCard";
import TVshowCard from "@/components/TVshowCard";
import { useEffect, useState } from "react";
import ContentSlideshow from "@/components/ContentSlideshow";

export default function Home(props) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error} = useSWR('/api/content',fetcher)
    if (error) return <p className="text-red-500">Failed to load movies.</p>;
    if (!data) return <p>Loading…</p>;
  
    const {movies,TVshows} = data;
    return (
      <div className="bg-black h-[100vh] pb-10">  
      {/* content slide show */}
      <ContentSlideshow content={data}/>
        {/* Content rows */}
        <div className="px-12 -mt-10">
          {/* Movies row */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Trending Movies</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
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