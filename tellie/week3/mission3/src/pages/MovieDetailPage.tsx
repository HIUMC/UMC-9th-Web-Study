import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import type { MovieDetail, CreditsResponse, Credit } from "../types/movie";
import { LoadingSpinner } from '../components/LoadingSpinner';


const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 상세 크레딧 데이터
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Credit[]>([]);
  const [crew, setCrew] = useState<Credit[]>([]);

  const [isPending, setIsPending] = useState(false); // 1. 로딩 state
  const [isError, setIsError] = useState(false); // 2. 에러 state

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const [detailRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                accept: "application/json",
              },
            }
          ),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                accept: "application/json",
              },
            }
          ),
        ]);

        setMovieDetail(detailRes.data);
        setCast(creditsRes.data.cast || []);
        setCrew(creditsRes.data.crew || []);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isError) {
    return (
      <div className="p-6 text-red-500 text-lg">
        에러가 발생했습니다.
      </div>
    );
  }

  if (isPending || !movieDetail) {
    return <div className="p-6 text-gray-500 place-items-center"><LoadingSpinner /></div>;
  }


  return (
    <div className="min-h-screen text-white">
        <section className="relative w-full rounded-xl overflow-hidden"
        style={{ minHeight: 240 }}>
            {movieDetail.backdrop_path && (
                <img src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
                alt={movieDetail.title}
                className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            <div className="relative p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{movieDetail.title}</h1>
                <div className="text-sm text-gray-200 space-x-3 mb-3">
                    <span>평균 {movieDetail.vote_average.toFixed(1)}</span>
                    <span>{movieDetail.release_date?.slice(0, 4) || '—'}</span>
                    <span>{movieDetail.runtime ? `${movieDetail.runtime}분` : '러닝타임 정보 없음'}</span>
                </div>
                <p className="max-w-3xl text-gray-100 leading-7">
                    {movieDetail.overview || '줄거리 정보가 없습니다.'}
                </p>
            </div>
        </section>

        <section className="mt-8 bg-[#0f1013] rounded-xl p-6">
            <h1 className="text-xl font-semibold mb-3">감독/출연</h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
                {[...crew.filter(m => m.job === 'Director'), ...cast].map(p => (
                    <li key={p.id} className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 mb-2">
                            {p.profile_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${p.profile_path}`}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No Image
                                </div>
                            )}
                        </div>
                        <div className="text-sm font-medium truncate max-w-[110px]">{p.name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[110px]">
                            {p.job === 'Director' ? '감독' : (p.character || '배역 정보 없음')}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    </div>
);
};

export default MovieDetailPage;