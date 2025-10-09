import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Cast, Person } from "../types/Person";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetail>();
    const [cast, setCast] = useState<Person[]>([]);
    const [crew, setCrew] = useState<Person[]>([]);
    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError, setIsError] = useState(false);
    
    const { movieId } = useParams<{
        movieId: string;
    }>();

    useEffect(() => {
        const fetchMovieDetail = async() => {
            setIsPending(true);
            try {
                const {data: movieData} = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovie(movieData);

                const {data: creditsData} = await axios.get<Cast>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                )
                setCast(creditsData.cast ?? []);
                setCrew(creditsData.crew ?? []);
                setIsError(false);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    if(isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        )
    }
    return (
    <div className="relative w-full min-h-screen p-0.5">
        {isPending && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <LoadingSpinner/>
            </div>
        )}
        {!isPending && (
            <div className="bg-gray-900 rounded-xl shadow-lg p-5 text-white flex flex-col gap-8">
                <div className="flex flex-row gap-8">
                    <img
                    className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                    />
                    
                    <div className="flex-1 flex flex-col justify-start">
                        <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
                        <p className="text-lg text-gray-300 mb-2">{movie?.release_date} • {movie?.runtime}분</p>
                        <p className="text-lg mb-4">평점: {movie?.vote_average} / 10 ({movie?.vote_count} votes)</p>
                        <p className="text-gray-300 mb-4">{movie?.overview}</p>
                        <p className="text-sm text-gray-400">장르: {movie?.genres.map(g => g.name).join(", ")}</p>
                    </div>
                </div>
            
                <div className="flex flex-col bg-gray-800 rounded-xl shadow-lg p-5 gap-6">
                    <h2 className="text-2xl font-bold text-white">감독 / 출연진</h2>
                    <div className="flex flex-wrap gap-6">
                    {crew.map(person => (
                        <div key={person.id} className="flex flex-col items-center w-[190px]">
                            <img
                            className="w-20 h-20 rounded-full object-cover mb-2"
                            src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : '/placeholder.png'}
                            alt={person.name}
                        />
                            <p className="text-sm font-semibold text-white text-center mb-1">{person.name}</p>
                            <p className="text-xs text-gray-300 text-center">{person.job}</p>
                        </div>
                    ))}
                    <div className="flex flex-wrap gap-6 mt-4">
                        {cast.map(person => (
                            <div key={person.id} className="flex flex-col items-center w-[80px]">
                                <img
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : '/placeholder.png'}
                                    alt={person.name}
                                />
                                <p className="text-sm font-semibold text-white text-center mb-1">{person.name}</p>
                                <p className="text-xs text-gray-300 text-center">{person.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
)}

export default MovieDetailPage;