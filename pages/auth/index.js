import ContentSlideshow from "@/components/ContentSlideshow";
import AuthLayout from "@/components/layouts/AuthLayout";
import ContentCard from "@/components/ContentCard";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MoviesList = ({ data, error }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load movies. {error.message}
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading…
      </div>
    );

  const {
    movies = [],
    TopRated = [],
    Upcoming = [],
    TVshows = [],
    TopShows = [],
    LiveShows = [],
  } = data;
  return (
    <AuthLayout>
      <div className="bg-black">
        <ContentSlideshow content={data} />
        <p className="text-2xl mx-8 py-4 font-bold">Movies 🎬</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none">
                <ContentCard content={movie} isShow={false} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mx-8 py-4 font-bold">Top Rated Movies💥</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {TopRated.map((movie) => (
              <div key={movie.id} className="flex-none">
                <ContentCard content={movie} isShow={false} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mx-8 py-4 font-bold">Upcoming Movies 🔮</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {Upcoming.map((movie) => (
              <div key={movie.id} className="flex-none">
                <ContentCard content={movie} isShow={false} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mx-8 py-4 font-bold">TV Shows 📺</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-8 scrollbar-hide">
            {TVshows.map((show) => (
              <div key={show.id} className="flex-none">
                <ContentCard content={show} isShow={true} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mx-8 py-4 font-bold">Top Rated Shows 🎩</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-8 scrollbar-hide">
            {TopShows.map((show) => (
              <div key={show.id} className="flex-none">
                <ContentCard content={show} isShow={true} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mx-8 py-4 font-bold">Live TV Shows 🔴</p>
        <div className="max-w-screen mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-8 scrollbar-hide">
            {LiveShows.map((show) => (
              <div key={show.id} className="flex-none">
                <ContentCard content={show} isShow={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default MoviesList;

export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:3000/api/content").then(
      (res) => res.json()
    );
    return {
      props: {
        data: response,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: {
          message: error.message || "Something went wrong",
          status: error.status || 500,
        },
      },
    };
  }
}
