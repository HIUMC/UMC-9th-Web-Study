import type { MovieDetails } from "../types/movie"

interface MovieHeaderProps {
  details: MovieDetails
}

export const MovieHeader = ({ details }: MovieHeaderProps) => {
  return (
    <div className="relative text-white">
      <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt="" className=" w-full h-[350px] object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
        <h1 className="text-3xl font-bold mb-2">{details.title}</h1>
        <h3>평균 {details.vote_average.toFixed(1) ?? '?.?'}</h3>
        <h3>{details.release_date.slice(0, 4) ?? 'Unknown Year'}</h3>
        <h3>{details.runtime ? `${details?.runtime}분` : 'Unknown Runtime'}</h3>
        <h2 className="text-2xl mt-6 mb-3 italic">{details.tagline}</h2>
        <p className="mb-5">{details?.overview}</p>
      </div>
    </div>
  )
}