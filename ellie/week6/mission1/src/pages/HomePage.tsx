import { useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import Lp from "../components/Lp";

function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isPending, isError } = useGetLpList({
    search,
    order,
    sort: "createdAt",
  });

  if (isPending) {
    return <div className="mt-20 text-2xl">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20 text-2xl">Error.</div>;
  }

  return (
    <>
      <div className="mt-10 p-4">
        <div className="flex justify-end mb-4">
          <button
            className={`w-20 h-8 border border-white rounded-sm ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setOrder("asc")}
          >
            오래된순
          </button>
          <button
            className={`w-20 h-8 border border-white rounded-sm ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setOrder("desc")}
          >
            최신순
          </button>
        </div>
        {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
        <div className="mt-10 p-4">
          <div className="grid grid-cols-8 gap-4 justify-items-center">
            {data?.map((lp) => (
              <Lp key={lp.id} lp={lp} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
