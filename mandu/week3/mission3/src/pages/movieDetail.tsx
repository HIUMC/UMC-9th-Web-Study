import { useParams } from "react-router-dom";
import { useLoadDetail } from "../api/movieApi";
import { useState } from "react";
import type { Cast, Details } from "../types/movie";
import { PacmanLoader } from "react-spinners";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [casts, setCasts] = useState<Cast[]>([]); // 렌더링
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false); // 로딩중

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; // 이미지 url

  if (!movieId) return;
  else useLoadDetail(movieId, setDetails, setCasts, setLoading);

  console.log(details);
  console.log(casts);
  return (
    <>
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
        <div className="grid grid-rows-2 max-h-screen p-4">
          <section className="relative">
            <div className="absolute inset-0 text-white p-5 w-2lg">
              <h1 className="font-bold text-3xl">{details?.title}</h1>
              <br />
              <p>평균 {details?.vote_average.toFixed(1)}</p>
              <p>{details?.release_date.slice(0, 4)}</p>
              <p>{details?.runtime}분</p>
              <br />
              <h2 className="font-bold text-xl italic">{details?.tagline}</h2>
              <p>
                {details?.overview.length > 200
                  ? `${details?.overview.slice(0, 200)}...`
                  : details?.overview}
              </p>
            </div>
            <img
              className="w-full max-h-full object-cover"
              src={`${IMAGE_BASE_URL}${details?.poster_path}`}
            />
          </section>

          <section>
            <h1 className="font-bold text-2xl">감독/출연</h1>
            <ul className="grid grid-cols-10">
              {casts &&
                casts?.map((cast) => (
                  <li
                    key={cast.id}
                    className="flex justify-center justify-items-center rounded-xl bg-gray-200 m-2"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                        alt={cast.name}
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                        className="rounded-xl overflow-hidden "
                      />
                      <div>
                        <p>{cast.character}</p>
                        <p>{cast.original_name}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
