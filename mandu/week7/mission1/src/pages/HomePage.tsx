import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import ToggleButton from "../components/Buttons/ToggleButton";
import PlusButton from "../components/Buttons/PlusButton";
import PlusLpModal from "../components/Modals/PlusLpModal";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const [asc, setAsc] = useState(true);
  const currentOrder = !asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  const [open, setOpen] = useState(false);
  const handlePlusLp = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
    <>
      <div className="container mx-auto px-4 py-6">
        {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
        <ToggleButton asc={asc} setAsc={setAsc} />
        {open && <PlusLpModal onClose={onClose} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} className="h-2"></div>
      </div>
      <PlusButton handlePlus={handlePlusLp} isOpen={open} />
    </>
  );
};

export default HomePage;
