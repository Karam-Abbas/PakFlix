import React from "react";
import { useEffect, useState } from "react";
const ContentSlideshow = (props) => {
  const [index, SetIndex] = useState(0);
  const { movies, TVshows = [] } = props.content;
  const data = [...movies, ...TVshows];
  useEffect(() => {
    if (data.length > 1) {
      const interval = setInterval(() => {
        SetIndex((prev) => (prev + 1) % data.length);
      }, 5000);

      return () => clearInterval();
    }
  }, []);
  const current_content = data[index];
  return (
    <div>
      {/* Header section */}
      <div className="relative h-[70vh] w-full">
        {/* Backdrop image with proper sizing */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${
              current_content.backdrop_path || ""
            })`,
            backgroundPosition: "center 20%", // This positions the image slightly lower
          }}
        />
        {/* Content overlay */}
        {/* Content overlay - adjusted width and padding */}
<div className="absolute bottom-0 left-0 p-12 w-full lg: bg-gradient-to-t from-black via-black/20 to-transparent">
  {/* Content container with proper alignment */}
  <div className="ml-10 mr-0 max-w-2xl">
    {current_content.title ? (
      <h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-transform hover:scale-105"
        style={{
          textShadow:
            "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)"
        }}
      >
        {current_content.title}
      </h1>
    ) : (
      <h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-transform hover:scale-105"
        style={{
          textShadow:
            "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)"
        }}
      >
        {current_content.name}
      </h1>
    )}
    <p
      className="text-lg text-gray-300 mb-6 leading-relaxed font-light"
      style={{
        textShadow: "0 1px 3px rgba(0,0,0,0.6)",
        lineHeight: "1.5",
      }}
    >
      {current_content.overview?.substring(0, 150)}
      {current_content.overview?.length > 150 ? "..." : ""}
    </p>
    <button className="bg-red-600 text-white py-2 px-8 rounded hover:bg-red-700 transform transition-transform hover:scale-110 hover:shadow-lg">
      Watch Now
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default ContentSlideshow;
