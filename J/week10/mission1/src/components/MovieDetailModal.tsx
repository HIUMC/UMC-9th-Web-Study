import { useEffect } from "react";
import type { Movie } from "../types/movie";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    const formatKoreanDate = (dateString: string) => {
        if (!dateString) return "";

        const [year, month, day] = dateString.split("-");
        return `${year}년 ${month}월 ${day}일`;
    };
    
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] max-w-[60vw] overflow-y-auto rounded-lg bg-white"
                onClick={(e) => e.stopPropagation()}
            >
        
                <div className="relative h-64">
                    <img
                        src={`${imageBaseUrl}${movie.backdrop_path}`}
                        className="h-full w-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 flex items-center justify-center h-10 w-10 rounded-full bg-black/60 text-lg text-white font-semibold cursor-pointer"
                    >
                        ✕
                    </button>

                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-3xl font-bold">{movie.title}</h2>
                        <p className="text-sm opacity-80">{movie.original_title}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 p-6">
                    <img
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        className="col-span-1 rounded-lg"
                    />

                    <div className="col-span-2 space-y-4">
                        <div className="flex flex-row items-center gap-2">
                            <h2 className="text-2xl text-blue-500 font-semibold">{movie.vote_average.toFixed(1)}</h2>
                            <p className="text-gray-500">({movie.vote_count.toFixed()} 평가)</p>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-1">
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-lg font-semibold">개봉일</h3>
                                <p className="">{formatKoreanDate(movie.release_date)}</p>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center p-3 gap-1">
                                <h3 className="mb-2 text-lg font-semibold">인기도</h3>
                                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                                    <div
                                        className="h-full rounded-lg bg-blue-600"
                                        style={{ width: `${movie.popularity}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center p-3">
                                <h3 className="mb-2 text-lg font-semibold">줄거리</h3>
                                <p className="text-sm leading-relaxed text-gray-900">{movie.overview}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <a
                                href={`https://www.imdb.com/find?q=${movie.title}`}
                                target="_blank"
                                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                IMDb에서 검색
                            </a>
                            <button
                                onClick={onClose}
                                className="rounded border border-blue-500 text-blue-500 px-4 py-2 cursor-pointer hover:bg-blue-50"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};
