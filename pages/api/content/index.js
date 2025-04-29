const token = process.env.NEXT_TMDB_ACCESS_TOKEN
const options = {
  method: "GET",
      headers: {
        accept: "application/json",
        //proprietary for TMDB API
        Authorization: `Bearer ${token}`,
      },
    }
export default async function handler(req, res) {
  // For data
  const [apiResMovies, apiResTV] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/movie/week`, options),
    fetch("https://api.themoviedb.org/3/trending/tv/week", options) 
  ])
    // handle errors
    if (!apiResMovies.ok) {
      return res
        .status(apiResMovies.status)
        .json({ error: `TMDB movies responded with ${apiResMovies.status}` })
    }
    if (!apiResTV.ok) {
      return res
        .status(apiResTV.status)
        .json({ error: `TMDB TV responded with ${apiResTV.status}` })
    }

    // parse JSON
    const dataMovies = await apiResMovies.json()
    const dataTV = await apiResTV.json()

    // respond with only the results arrays
    return res.status(200).json({
      movies: dataMovies.results,
      TVshows: dataTV.results
    })
  } 