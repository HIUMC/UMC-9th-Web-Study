import { useParams } from "react-router-dom";
import type { MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Cast} from "../types/Person";
import { useCustomFetch } from "../hooks/useCustomFetch";
import NotFoundPage from "./NotFoundPage";

const MovieDetailPage = () => {
    const { movieId } = useParams<{
        movieId: string;
    }>();

    const { data: movieData, isPending: isMoviePending, isError: isMovieError } = useCustomFetch<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, [movieId]);

    const { data: creditsData, isPending: isCreditsPending, isError: isCreditsError } = useCustomFetch<Cast>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, [movieId])

    if(isMovieError || isCreditsError) {
        return <NotFoundPage/>
    }
    return (
    <div className="relative w-full min-h-screen p-0.5">
        {(isMoviePending || isCreditsPending) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <LoadingSpinner/>
            </div>
        )}
        {(!isMoviePending && !isCreditsPending) && (
            <div className="bg-gray-900 rounded-xl shadow-lg p-5 text-white flex flex-col gap-8">
                <div className="flex flex-row gap-8">
                    <img
                    className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
                    alt={movieData?.title}
                    />
                    
                    <div className="flex-1 flex flex-col justify-start">
                        <h1 className="text-4xl font-bold mb-2">{movieData?.title}</h1>
                        <p className="text-lg text-gray-300 mb-2">{movieData?.release_date} • {movieData?.runtime}분</p>
                        <p className="text-lg mb-4">평점: {movieData?.vote_average} / 10 ({movieData?.vote_count} votes)</p>
                        <p className="text-gray-300 mb-4">{movieData?.overview}</p>
                        <p className="text-sm text-gray-400">장르: {movieData?.genres.map(g => g.name).join(", ")}</p>
                    </div>
                </div>
            
                <div className="flex flex-col bg-gray-800 rounded-xl shadow-lg p-5 gap-6">
                    <h2 className="text-2xl font-bold text-white">감독 / 출연진</h2>
                    <div className="flex flex-wrap gap-6 mt-4">
                        {creditsData?.cast.map((person) => (
                            <div key={person.id} className="flex flex-col items-center w-[190px]">
                                <img
                                    className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-white"
                                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : undefined}
                                />
                                <p className="text-sm font-semibold text-white text-center mb-1">{person.name}</p>
                                <p className="text-xs text-gray-300 text-center">{person.character}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-6">
                    {creditsData?.crew.map((person) => (
                        <div key={person.id} className="flex flex-col items-center w-[190px]">
                            <img
                            className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-white"
                            src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : undefined}
                        />
                            <p className="text-sm font-semibold text-white text-center mb-1">{person.name}</p>
                            <p className="text-xs text-gray-300 text-center">{person.job}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}
    </div>
)}

export default MovieDetailPage;