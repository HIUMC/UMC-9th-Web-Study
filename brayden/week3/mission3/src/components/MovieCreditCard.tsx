import type { MovieCredit } from "../types/movie";

interface MovieCreditProps {
  movieCredit: MovieCredit;
}

export default function MovieCreditCard({ movieCredit }: MovieCreditProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={`https://image.tmdb.org/t/p/w200${movieCredit.profile_path}`}
        alt={`${movieCredit.name} 의 이미지`}
        className="size-30 rounded-full overflow-hidden shadow-md border-4 border-gray-200"
      />
      <p className="text-white font-bold p-1">{movieCredit.name}</p>
      {movieCredit.job && (
        <p className="text-gray-500 text-xs">{movieCredit.job}</p>
      )}{" "}
      {/* 스태프일 경우 */}
      {movieCredit.character && (
        <p className="text-gray-500 text-xs">{movieCredit.character}</p>
      )}{" "}
      {/* 배우일 경우 */}
    </div>
  );
}
