import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import type { MovieDetail, CreditsResponse, Credit } from "../types/movie";
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const [movieDetail, setMovieDetail] = useState<MovieDetail|null>(null);
    const [cast, setCast] = useState<Credit[]>([]);
    const [crew, setCrew] = useState<Credit[]>([]);
    
    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchDetails = async (): Promise<void> => {
            setIsPending(true);
            setIsError(false);
            try {
                const { data } = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            accept: "application/json",
                        },
                    },
                );
                setMovieDetail(data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchDetails();
    }, []);


    if (isError) { 
        return (
            <div>
                <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        )
    }

    
    return (
        <>
            {isPending && (
                <div className="p-6 text-center text-gray-500">
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && movieDetail && (
                <div className="w-full p-6 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">{movieDetail.title}</h1>
        
                    {movieDetail.poster_path && (
                        <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                        alt={movieDetail.title}
                        className="rounded-lg shadow-md mb-4"
                        style={{ width: 250 }}
                        />
                    )}

                    <p className="text-gray-700 mb-4">{movieDetail.overview || "줄거리 정보가 없습니다."}</p>
        
                    <p className="text-sm text-gray-500">
                    개봉일: {movieDetail.release_date || "-"} · 평점: {movieDetail.vote_average}
                    </p>
                </div>
                
            )}
        </>
    )
};

export default MovieDetailPage;
