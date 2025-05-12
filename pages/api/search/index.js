const token = process.env.NEXT_TMDB_ACCESS_TOKEN
const options = {
  method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
export default async function handler(req,res){
    const {query} = req.body
    const api_res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`, 
      options
    );
    
    // Parse the JSON response from TMDB API
    const data = await api_res.json();
    
    // Return the data to the client
    return res.status(200).json(data);
}