import type { Credit } from "../types/movie";

interface MovieCreditProps{
  credit:Credit
}

export default function CreditCard({credit}:MovieCreditProps){
  return (
    <div className="relative flex flex-col items-center text-center">
      <img
        src = {`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
        alt = {credit.name}
        className="w-30 h-30 object-cover rounded-full border-white flex justify-center border-2 border-white"
      />
      <p className="text-white text-m text-center">{credit.name}</p>
      {credit.character && (
        <p className="text-gray-500 text-xs">{credit.character}</p>
      )}
      {credit.job && (
        <p className="text-white">{credit.job}</p>
      )}
    </div>
  )
  // 조건부 렌더링
  // credit.character 값이 있으면 <p>를 렌더링 => 배우일때
  // credit.crew 값이 있으면 <p>를 렌더링 => 스탭일 때
}

