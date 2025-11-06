import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const [asc, setAsc] = useState(true);
  const currentOrder = asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, currentOrder);

  // re,inView
  //ref ->특정한 HTML 요소를 감시 가능
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Error
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      <div className="flex justify-end items-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 border-white-600
              ${
                !asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(false)}
          >
            오래된 순
          </button>
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 border-white-600
              ${
                asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(true)}
          >
            최신 순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <Link to={`/lp/${lp.id}`} key={lp.id}>
              <div
                key={lp.id}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 "
              >
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50"
                />
                <div className="absolute bottom-0 left-0 right-0 opacity-0 p-2 group-hover:opacity-100">
                  <h3 className="text-white text-sm font-semibold">
                    {lp.title}
                  </h3>
                  <p>{new Date(lp.updatedAt).toISOString().split("T")[0]}</p>
                  <p>Likes {lp.likes.length}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
