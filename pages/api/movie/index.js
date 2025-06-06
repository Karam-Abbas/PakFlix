const token = process.env.NEXT_TMDB_ACCESS_TOKEN
const options = {
  method: "GET",
      headers: {
        accept: "application/json",
        //proprietary for TMDB API
        Authorization: `Bearer ${token}`,
      },
}

export default async function handler(req,res){
    const response = await fetch('https://api.themoviedb.org/3/discover/movie',options)

    const movies = await response.json()

    res.status(200).json(movies.results)
}