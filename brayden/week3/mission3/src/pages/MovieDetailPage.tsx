import { useParams } from "react-router-dom";
import axios from "axios";
import {
  type MovieCredit,
  type Movie,
  type MovieCreditResponse,
} from "../types/movie";
import { useEffect, useState } from "react";
import MovieDetailInfo from "../components/MovieDetaiInfo";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCreditCard from "../components/MovieCreditCard";
const MovieDetailPage = () => {
  const [details, setDetails] = useState<Movie>();
  const [credit, setCredit] = useState<MovieCredit[]>([]);

  // 1. 로딩상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);

  const params = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchMoviesDetailed = async () => {
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );

        const { data: credit } = await axios.get<MovieCreditResponse>(
          `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );
        setDetails(data);
        setCredit(credit.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMoviesDetailed();
  }, [params]);

  if (isError) {
    return (
      <div className="text-red-500 text-2xl">
        <span>에러가 발생했습니다. </span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && details && (
        <div className="w-full">
          {/* 1. 포스터 및 상세 정보 (이전 단계에서 구현됨) */}
          <MovieDetailInfo movie={details} />
          {/* 2. 크레딧 정보 섹션: 가로 나열, 줄 바꿈, 자동 정렬 */}
          <div className="max-w-6xl mx-auto  bg-black text-white">
            <h2 className="text-3xl font-bold border-b pb-2 mb-6 text-white">
              주요 출연진
            </h2>

            {/* 🎯 Flex 컨테이너 설정: flex-wrap과 gap을 사용하여 유연하게 나열 */}
            <div className="flex flex-wrap gap-4 justify-start">
              {credit &&
                // order 속성을 사용하여 CSS 정렬 순서를 지정합니다.
                credit
                  .sort((a, b) => a.order - b.order) // order 값에 따라 명시적으로 정렬
                  .map((c) => <MovieCreditCard key={c.id} movieCredit={c} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
