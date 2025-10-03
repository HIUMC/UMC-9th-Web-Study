import { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { MovieCreditResponse, MovieDetails } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieDetailHeader from "../components/detailPage/MovieDetailHeader";
import MovieCreditList from "../components/detailPage/MovieCreditList";

export default function MovieDetailPage() {
  const { movieID } = useParams<{ movieID: string }>();

  // 1. 영화 상세 정보 fetching
  const detailUrl = `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`;
  const {
    data: movieDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useCustomFetch<MovieDetails>(detailUrl);

  // 2. 출연진 정보 fetching
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?language=ko-KR`;
  const {
    data: creditResponse,
    isPending: isCreditPending,
    isError: isCreditError,
  } = useCustomFetch<MovieCreditResponse>(creditUrl);

  // creditResponse 데이터가 변경될 때마다 cast와 crew를 합쳐서 state 업데이트
  // useEffect(() => {
  //   if (creditResponse) {
  //     setCredit([...creditResponse.cast, ...creditResponse.crew]);
  //   }
  // }, [creditResponse]);

  // APi로부터 creditResponse라는 데이터를 받는데 cast 배열과 crew 배열이 따로 들어있음.
  // 이 둘은 합친 하나의 credits 배열을 보여주는데 cast + crew 배열을 합치는 계산을 해야함
  // 이때 영화 상세정보만 바뀌거나 전혀 상관없는 상태가 바뀔때도 이 계산을 해야함
  // 따라서 useMemo를 사용하여 creditResponse 데이터가 바뀔 때만 하고, 다른 이유로 리렌더링
  // 될때는 이전값을 재사용하게 함.

  const credits = useMemo(() => {
    if (!creditResponse) {
      return []; // creditResponse가 없으면 빈 배열 반환
    }
    return [...creditResponse.cast, ...creditResponse.crew];
  }, [creditResponse]); // creditResponse가 변경될 때만 이 코드가 다시 실행됨

  // 두 요청 중 하나라도 에러가 발생하면 에러 메시지 표시
  const isError = isDetailError || isCreditError;
  // 두 요청 중 하나라도 로딩 중이면 로딩 스피너 표시
  const isPending = isDetailPending || isCreditPending;

  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }
  console.log("isPending : ", isPending);
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c]">
      {/* 영화 상세 정보 헤더 */}
      {movieDetail && <MovieDetailHeader movie={movieDetail} />}
      {/* 출연진 목록 */}
      <MovieCreditList credits={credits} />
    </div>
  );
}
