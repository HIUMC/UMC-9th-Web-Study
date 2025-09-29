import type { Credit } from "../types/movie"

interface MovieCreditProps {
    credit: Credit
}


export default function MovieCredit({credit}:MovieCreditProps) {
  
  
  return (
    <div 
      className="flex flex-col items-center text-center"
    >
      <img 
        src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
        alt={`${credit.name} 의 이미지`}
        className="size-30 rounded-full overflow-hidden shadow-md border-4 border-gray-200"
        />
      <p className="text-white font-bold p-1">{credit.name}</p>
      {credit.job && <p className="text-gray-500 text-xs">{credit.job}</p>} {/* 스태프일 경우 */}
      {credit.character && <p className="text-gray-500 text-xs">{credit.character}</p>} {/* 배우일 경우 */} 

    </div>
  )
}
