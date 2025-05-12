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
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',options)

    const res = await response.json()
    console.log(res.genres)
    res.status(200).json(res.genres)
}