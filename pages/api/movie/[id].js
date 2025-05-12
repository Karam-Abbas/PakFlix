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
    if (req.method === 'POST') {
            const { mid } = req.body;
            
            if (!mid) {
                return res.status(400).json({ error: 'Missing movie ID' });
            }
            
            
            const response = await fetch(`https://api.themoviedb.org/3/movie/${mid}`, options);
            
            if (!response.ok) {
                throw new Error(`TMDB API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            res.status(200).json({
                body: data
            });
        }
        else{
            const {id} = req.query
            if (!id) {
                return res.status(400).json({ error: 'Missing movie ID' });
            }
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`,options)
            
            if (!response.ok) {
                throw new Error(`TMDB API error: ${response.status}`);
            }
            
            const data = await response.json();

            res.status(200).json(data.results);
    }
}