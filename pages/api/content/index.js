const token = process.env.NEXT_TMDB_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`, // TMDB proprietary
  },
};

// Helper function to fetch and check response
const fetchAndCheck = async (url, label) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${label} responded with ${res.status}`);
  }
  return res.json();
};

export default async function handler(req, res) {
  try {
    const [dataMovies, dataTopMovies, dataUpcoming, dataTV,dataTopShows,dataLiveShows] =
      await Promise.all([
        fetchAndCheck("https://api.themoviedb.org/3/discover/movie", "Movies"),
        fetchAndCheck(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          "Top Rated Movies"
        ),
        fetchAndCheck(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          "Upcoming Movies"
        ),
        fetchAndCheck("https://api.themoviedb.org/3/discover/tv", "TV Shows"),
        fetchAndCheck(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          "Top Rated Shows"
        ),
        fetchAndCheck(
          "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
          "On Air TV shows"
        ),
      ]);

    return res.status(200).json({
      movies: dataMovies.results,
      TopRated: dataTopMovies.results,
      Upcoming: dataUpcoming.results,
      TVshows: dataTV.results,
      LiveShows:dataLiveShows.results,
      TopShows:dataTopShows.results
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
