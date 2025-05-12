import React, { useState } from "react";
import Image from "next/image";
import MovieModal from "./MovieModal";
import TVShowModal from "./TVShowModal";
const ContentCard = ({ content,isShow }) => {
  if (!content) {
    return null;
  }
  const [isOpen,setIsOpen]=useState(false);

  const isMovie =
    content.hasOwnProperty("poster_path") && content.hasOwnProperty("title");
    const handler =()=>{
      setIsOpen(true)
  }
  return (
    <>
    {isOpen && !isShow && <MovieModal open={isOpen} onClose={()=>setIsOpen(false)} movieId={content.id} />}
    {isOpen && isShow && <TVShowModal open={isOpen} onClose={()=>setIsOpen(false)} tvShowId={content.id}/>}
    <div
      className="group w-40 sm:w-48 cursor-pointer"
      onClick={handler}
    >
      {/* poster image */}
      <div className=" overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <Image
          src={`https://image.tmdb.org/t/p/w300${
            isMovie ? content.poster_path : content.poster_path
          }`}
          alt={isMovie ? content.title : content.name}
          width={300}
          height={450}
          className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* title & meta */}
      <div className="mt-2 text-white">
        <h3 className="text-sm font-semibold line-clamp-2">
          {isMovie ? content.title : content.name || "Unknown Show"}
        </h3>
        <p className="text-xs text-gray-400">
          {isMovie ? content.release_date : content.first_air_date}
        </p>
        <div className="mt-1 flex items-center text-xs">
          <span className="inline-block bg-yellow-500 text-black rounded-md py-[1px] px-[2px]">
            {isMovie
              ? content.vote_average?.toFixed(1)
              : content.vote_average?.toFixed(1)}
          </span>
          <span className="ml-1 text-gray-400">
            ({isMovie ? content.vote_count : content.vote_count})
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContentCard;
