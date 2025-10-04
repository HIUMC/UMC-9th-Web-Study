import { useState } from "react";
import type { Movie } from "../types/movie";
import { useLoadApi } from "../api/movieApi";
import RenderPage from "../components/renderPage";
import { PacmanLoader } from "react-spinners";

const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [page, setPage] = useState(1);
  const handleMinus = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };
  const handlePlus = () => {
    setPage((prev) => prev + 1);
  };

  console.log(movies);

  const [loading, setLoading] = useState(false); // 로딩중

  const err = useLoadApi("top_rated", setMovies, page, setLoading);

  if (err) return <h1>에러입니다.</h1>;
  return (
    <>
      <div className="flex justify-center content-center gap-4 h-[80px]">
        <button
          onClick={handleMinus}
          className="p-4 bg-purple-300 rounded-xl h-[50px] w-[70px] text-xl font-bold hover:bg-green-200 transition-all"
        >
          &lt;
        </button>
        <p className="p-4 h-[50px]">{page} 페이지</p>
        <button
          onClick={handlePlus}
          className="p-4 bg-purple-300 rounded-xl h-[50px] w-[70px] text-xl font-bold hover:bg-green-200 transition-all"
        >
          &gt;
        </button>
      </div>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <PacmanLoader size={100} speedMultiplier={3} />
        </div>
      ) : (
        <RenderPage movies={movies} />
      )}
    </>
  );
};

export default TopRated;
