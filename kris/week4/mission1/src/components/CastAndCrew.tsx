import type { Credit } from "../types/credit";

interface CastAndCrewProps {
  casts: Credit[],
  crews: Credit[],
}

export const CastAndCrew = ({casts, crews}: CastAndCrewProps) => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mt-5 mb-5">출연</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {casts.slice(0, 20).map((cast) => (
          <div key={cast.id} className="flex flex-col items-center w-30">
            <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" className="size-30 rounded-full object-cover border-2 border-white"/>
            <p className="mt-1 text-sm text-center">{cast.name}</p>
            <p className="text-xs text-center">{cast.character}</p>
          </div>
                  
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-5 mb-5">제작</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {crews.slice(0, 20).map((crew) => (
          <div key={crew.id} className="flex flex-col items-center w-30">
            <img src={`https://image.tmdb.org/t/p/w200${crew.profile_path}`} alt="" className="size-30 rounded-full object-cover border-2 border-white"/>
            <p className="mt-1 text-sm text-center">{crew.name}</p>
            <p className="text-xs text-center">{crew.job}</p>
          </div>
        ))}
      </div>
    </div>
  )
}