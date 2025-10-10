import type { MovieCredit } from "../../types/movie";
import MovieCreditCard from "./MovieCreditCard";

interface MovieCreditListProps {
  credits: MovieCredit[];
}

export default function MovieCreditList({ credits }: MovieCreditListProps) {
  return (
    <div>
      <h1 className="text-white text-3xl font-bold p-4 m-3">감독 / 출연</h1>
      <div className="p-10 grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {credits.map((credit) => (
          <MovieCreditCard key={credit.credit_id} movieCredit={credit} />
        ))}
      </div>
    </div>
  );
}
