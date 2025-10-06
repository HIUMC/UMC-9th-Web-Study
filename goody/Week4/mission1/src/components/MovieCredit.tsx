import { LoadingSpinner } from "./LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import type {CreditResponse } from "../types/movie";


export default function MovieCredit({movieID}: {movieID:number | undefined}) {

  const {data ,isPending, isError} = useCustomFetch<CreditResponse> (
    `https://api.themoviedb.org/3/movie/${movieID}/credits?language=ko-KR`,
    [movieID]
  )

  console.log(data);


  if (isError) {  
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  return (
    <div 
      className="flex flex-col items-center text-center"
    >
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {data?.cast.map((cast) => (
              <div key={cast.credit_id} className="flex flex-col items-center text-center">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                  alt={`${cast.name} 의 이미지`}
                  className="size-30 rounded-full overflow-hidden shadow-md border-4 border-gray-200"
                  />
                <p className="text-white font-bold p-1">{cast.name}</p>
                <p className="text-blue-300 text-xs">{cast.character}</p> {/* 배우일 경우 */}
                </div>
          ))}
          {data?.crew.map((crew) => (
              <div key={crew.credit_id} className="flex flex-col items-center text-center">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${crew.profile_path}`}
                  alt={`${crew.name} 의 이미지`}
                  className="size-30 rounded-full overflow-hidden shadow-md border-4 border-gray-200"
                  />
                <p className="text-white font-bold p-1">{crew.name}</p>
                <p className="text-gray-500 text-xs">{crew.job}</p> {/* 스태프일 경우 */}
                </div>
          ))}
        </div>
      )}
    </div>
  )
}
