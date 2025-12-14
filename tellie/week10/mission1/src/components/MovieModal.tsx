import { type Movie } from "../types/movie";
import { X, Search } from "lucide-react";

interface MovieModalProps {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
    if (!isOpen || !movie) return null;

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const posterUrl = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : "https://via.placeholder.com/640x480";

    const handleIMDbSearch = () => {
        const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
        window.open(imdbUrl, "_blank");
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-4xl max-h-[90vh] rounded-lg bg-white shadow-2xl overflow-hidden flex"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-gray-200 p-2 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* 모달 내용: 2열 레이아웃으로 구현 */}
                <div className="flex w-full gap-6 p-8">
                    {/* 왼쪽: 포스터 이미지 */}
                    <div className="flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={`${movie.title} 포스터`}
                            className="h-80 w-48 rounded-lg object-cover shadow-lg"
                        />
                    </div>

                    {/* 오른쪽: 영화 정보 */}
                    <div className="flex-1 overflow-y-auto pr-4">
                        {/* 제목 */}
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">
                            {movie.title}
                        </h2>
                        <p className="mb-4 text-sm text-gray-600">
                            {movie.original_language.toUpperCase()}
                        </p>

                        {/* 평점 */}
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-2xl font-bold text-yellow-500">
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-600">
                                ({movie.vote_count.toLocaleString()}명)
                            </span>
                        </div>

                        {/* 개봉일 */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                개봉: {movie.release_date}
                            </p>
                        </div>

                        {/* 인기도 */}
                        <div className="mb-6 rounded-lg bg-gray-100 p-3">
                            <p className="text-xs font-semibold text-gray-600 mb-1">
                                인기도
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                                {movie.popularity.toFixed(1)}
                            </p>
                        </div>

                        {/* 구분선 */}
                        <hr className="mb-4" />

                        {/* 줄거리 */}
                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold text-gray-800">
                                줄거리
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
                                {movie.overview || "줄거리 정보가 없습니다."}
                            </p>
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-3 sticky bottom-0 bg-white pt-4">
                            <button
                                onClick={handleIMDbSearch}
                                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
                            >
                                <Search size={18} />
                                IMDb에서 검색
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded-lg border border-gray-300 px-6 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
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

export default MovieModal;
