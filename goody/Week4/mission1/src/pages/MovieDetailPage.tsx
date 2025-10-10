import { useParams } from "react-router-dom";
import type {MovieDetails} from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCredit from "../components/MovieCredit";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieDetailPage() {

    const {movieID} = useParams<{ movieID : string; }>();


    const {data,isPending,isError} = useCustomFetch<MovieDetails> (
        `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR,`,
        [movieID]
    )
    

    // useEffect(() => {
    //     const fetchCredits = async () =>{

    //         setIsPending(true);
    //         try {
    //             const {data} = await axios.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`, 
    //             { 
    //                 headers : { 
    //                     Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
    //                 },
    //             }
    //             );
    //             setMovieDetail(data);
                
    //             setIsPending(false);
    //         } catch {
    //             setIsError(true);
    //             setIsPending(false);
    //         } finally {
    //             setIsPending(false);
    //         }
    //     };

    //     fetchCredits();
    // }, [movieID]);

    if (isError) {
        return (<div>
            <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
        </div>);
    }


    return (
        <div className="bg-[#1c1c1c]">
            <div className="relative w-full rounded-lg overflow-hidden border-b-5 border-gray-500">
                <img 
                    src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`} 
                    alt={data?.title}
                    className="h-[400px] w-full object-cover"
                />

                <div className="absolute top-4 left-5 text-white max-w-150 ">
                    <h1 className="text-3xl font-bold mt-2 mb-2">{data?.title}</h1>  
                    <p className="text-m ">{data?.vote_average}</p>
                    <p className="text-m">{data?.release_date}</p>
                    <p>{data?.runtime}분</p>
                    <p className="text-2xl font-semibold italic mt-1 mb-4">{data?.tagline}</p>
                    <p className="line-clamp-5 max-w-[60%]">{data?.overview}</p>
                </div>
                    
                    
            </div>
            <h1 className="text-white text-3xl font-bold p-4 m-3"> 감독 / 출연 </h1>
            {data?.id !== undefined && <MovieCredit movieID={data.id} />}

            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

            
        </div>
    );
}

