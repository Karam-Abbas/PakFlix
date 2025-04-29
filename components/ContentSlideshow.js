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
      <div className="sticky h-[70vh]">
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
        <div className="absolute bottom-0 left-0 p-12 w-full h-1/2 lg: bg-gradient-to-t from-black via-black/50 to-transparent">
          {/* Content container with proper alignment */}
          <div className="ml-10 mr-0 max-w-2xl">
            {current_content.title ? (
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-transform "
              >
                {current_content.title}
              </h1>
            ) : (
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-transform"
              >
                {current_content.name}
              </h1>
            )}
            <p
              className="text-2xl text-gray-300 mb-6 leading-relaxed font-light"
            >
              {current_content.overview?.substring(0, 150)}
              {current_content.overview?.length > 150 ? "..." : ""}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlideshow;
