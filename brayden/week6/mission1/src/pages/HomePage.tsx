import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  // console.log(data?.data.data?.map((lp) => lp.id));

  const {
    data: lps,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(1, search, PAGINATION_ORDER.desc);

  // ref, inView
  // ref -> 특정한 html 요소 감시
  // inView -> ref가 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  console.log(inView);

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  // console.log(lps?.pages.map((page) => console.log(page)));
  // [[1,2], [3,4]].flat = [1,2,3,4]

  return (
    <div className="container mx-auto px-4 py-6">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
        <div ref={ref} className="h-2"></div>
      </div>
    </div>
  );
};

export default HomePage;
