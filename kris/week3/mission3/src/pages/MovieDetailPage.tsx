import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails} from "../types/movie";
import axios from "axios";
import type { Cast, CreditsResponse, Crew } from "../types/credit";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMsg } from "../components/ErrorMsg";

const MovieDetailPage = () => {
  const params = useParams();
  // return (
  //   <div>movie detail {params.movieId}</div>
  // )
  const [details, setDetails] = useState<MovieDetails>();

  const [cast, setCast] = useState<Cast[]>([]); 
  const [crew, setCrew] = useState<Crew[]>([]); 

  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`
        ,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        });
        const { data: credits} = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=en-US`
        ,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        })
        setDetails(data)
        setCast(credits.cast)
        setCrew(credits.crew)
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    }
    fetchMovieDetails()
  }, [])

  if(isError) {
    return (
      <div>
        <ErrorMsg/>
      </div>
    )
  }

  return (
    <>
      <div className="p-6 bg-black">
        {!isPending && (
          <>
            <div className="relative text-white">
              <img src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`} alt="" className=" w-full h-[350px] object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
                <h1 className="text-3xl font-bold">{details?.title}</h1>
                <h3>평균 {details?.vote_average}</h3>
                <h3>{details?.release_date}</h3>
                <h3>{details?.runtime}분</h3>
                <h2 className="text-2xl mt-3 mb-3 italic">{details?.tagline}</h2>
                <p className="mb-5">{details?.overview}</p>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-5">감독/출연</h1>
              <div className="flex flex-wrap gap-6 justify-center">
                {cast.slice(0, 20).map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center w-30">
                    <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt=""
                    className="size-30 rounded-full object-cover border-2 border-white"/>
                    <p className="mt-1 text-sm">{actor.name}</p>
                    <p className="text-xs">{actor.character}</p>
                  </div>
                  
                ))}
                {crew.filter((cr) => cr.job === "Director").map((director) => (
                  <div key={director.id} className="flex flex-col items-center w-30">
                    <img src={`https://image.tmdb.org/t/p/w200${director.profile_path}`} alt={director.name}
                    className="size-30 rounded-full object-cover border-2 border-white"/>
                    <p className="mt-1 text-sm">{director.name}</p>
                    <p className="text-xs">{director.department}</p>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )}        
      </div>
      
    </>
  )
}

export default MovieDetailPage