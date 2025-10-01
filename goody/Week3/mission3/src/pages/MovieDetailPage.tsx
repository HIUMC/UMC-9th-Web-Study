import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Credit, CreditResponse, MovieDetails} from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCredit from "../components/MovieCredit";

export default function MovieDetailPage() {

    const [credit, setCredit] = useState<Credit[]>([]);

    const [movieDetail, setMovieDetail] = useState<MovieDetails | null>(null);

    // 1. 로딩 상태
    const [isPending,setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError,setIsError] = useState(false);

    const {movieID} = useParams<{ movieID : string; }>();

    useEffect(() => {
        const fecthCredits = async () =>{

            setIsPending(true);
            try {
                const {data : detail} = await axios.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`, 
                { 
                    headers : { 
                        Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
                    },
                }
                );
                setMovieDetail(detail);

                const {data : credit } = await axios.get<CreditResponse>(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=ko-KR`, 
                { 
                    headers : {
                    Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
                    },
                }
                );
                console.log(detail);
                console.log(credit);
                setCredit([...credit.cast, ...credit.crew]);
                // 두개를 합쳐서 상태 업데이트
                
                
                setIsPending(false);
            } catch {
                setIsError(true);
                setIsPending(false);
            }
        };

        fecthCredits();
    }, [movieID]);

    if (isError) {
        return (<div>
            <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
        </div>);
    }


    return (
        <div className="bg-[#1c1c1c]">
            <div className="relative w-full rounded-lg overflow-hidden border-b-5 border-gray-500">
                <img 
                    src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`} 
                    alt={movieDetail?.title}
                    className="h-[400px] w-full object-cover"
                />

                <div className="absolute top-4 left-5 text-white max-w-150 ">
                    <h1 className="text-3xl font-bold mt-2 mb-2">{movieDetail?.title}</h1>  
                    <p className="text-m ">{movieDetail?.vote_average}</p>
                    <p className="text-m">{movieDetail?.release_date}</p>
                    <p>{movieDetail?.runtime}분</p>
                    <p className="text-2xl font-semibold italic mt-1 mb-4">{movieDetail?.tagline}</p>
                    <p className="line-clamp-5 max-w-[60%]">{movieDetail?.overview}</p>
                </div>
                    
                    
            </div>
            <h1 className="text-white text-3xl font-bold p-4 m-3"> 감독 / 출연 </h1>
            
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && (
                <div className="p-10 grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                    {credit.map((credit) => (
                        <MovieCredit key={credit.credit_id} credit={credit} />
                    ))}
                </div>
            )}
        </div>
    );
}

