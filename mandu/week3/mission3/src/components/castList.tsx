import type { Cast } from "../types/movie";

const CastList = ({ casts }: Cast[]) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div>
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
    </div>
  );
};

export default CastList;
