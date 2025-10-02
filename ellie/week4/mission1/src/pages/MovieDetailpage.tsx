import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Credit, Movie } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCreditCard from "../components/MovieCreditCard";
import useFetch from "../hooks/useCustomFetch";

export default function MovieDetailPage() {
  
  const { movieId } = useParams();

  const {datas:detail,isError,isPending} = useFetch<Movie> (
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR,`,
    [movieId]
  )

  const {datas:credit}=useFetch<{ cast: Credit[]; crew: Credit[] }>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    [movieId]
  )

  const credits=credit?[...credit.cast,...credit.crew] : [];
 
  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    )
  }
  // movie 의 초기값은 undefined
  // 그상태에서 jsx에서 movie.title, movie.poster_path 이런걸 렌더링 하면 에러
  // 로딩 스피너 보여줌
  if (isPending || !detail) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }
  return (
        <div className="bg-black/100">
          <div className="relative w-full">
            <img 
              src= {`https://image.tmdb.org/t/p/w500${detail.backdrop_path}`}
              alt={detail.title}
              className="w-full h-[300px] object-cover p-3"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 "/>
            <div className="absolute top-4 left-4 text-white max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
              <p className="">{detail.vote_average}</p>
              <p>{detail.release_date}</p>
              <p className="mb-2">{detail.runtime}분</p>
              <p className="text-xl font-bold mb-5">{detail.tagline}</p>
              <p className="text-sm line-clamp-4 max-w-[50%]">{detail.overview}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white m-4">감독/출연</h1>
          <div className="grid gap-4 grid-cols-8">
              {credits?.map((credit) => 
                <MovieCreditCard key={credit.credit_id} credit={credit}/>
              )}
          </div>
        </div>
  )
}
// map 쓸 때 key 필요...