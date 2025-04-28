import useSWR from "swr";
import MovieCard from "@/components/MovieCard";
import TVshowCard from "@/components/TVshowCard";


export default function Home(props) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data,error} = useSWR('/api/content',fetcher)
    if (error) return <p className="text-red-500">Failed to load movies.</p>;
    if (!data) return <p>Loading…</p>;
  
    const {movies,TVshows} = data
    console.log(TVshows)
    return (
      <div className="bg-red-900 min-h-screen pb-10" style={{padding: '0 2rem'}}>
        <p className='text-xl pt-8 text-white font-bold'>Discover Movies</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {
          movies.map((m)=>{
            return <MovieCard key={m.id} movie={m}></MovieCard>
          })
        }
        </div>
        <p className='text-xl mt-12 text-white font-bold'>Discover Tv Shows</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {
          TVshows.map((tvs)=>{
            return <TVshowCard key={tvs.id} show={tvs}></TVshowCard>
          })
        }
        </div>
      </div>
    );
  }