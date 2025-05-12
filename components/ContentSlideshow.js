import React, { useEffect, useState } from "react";

const ContentSlideshow = ({ content }) => {
  const [index, setIndex] = useState(0);
  const { movies = [], TVshows = [] } = content;
  const slides = [...movies, ...TVshows];

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval); // ✅ Correct cleanup
    }
  }, [slides.length]);

  const current = slides[index];
  const title = current?.title || current?.name || "Untitled";

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${current?.backdrop_path || ""})`,
          backgroundPosition: "center 20%",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 h-1/4 bg-gradient-to-t from-black via-black/50 to-transparent w-full pb-8" />

      {/* Text content */}
      <div className="absolute bottom-6  left-10 max-w-2xl z-10 text-white transition-opacity duration-500">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <div className="h-1"></div>
        <p className="text-md md:text-lg text-gray-300 font-light leading-5 ">
          {current?.overview?.substring(0, 150)}
          {current?.overview?.length > 150 ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default ContentSlideshow;
