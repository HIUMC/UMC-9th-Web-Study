import { useState } from "react"
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { PageButton } from "../components/PageButton";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {

    const [page,setPage] = useState(1);

    const {category} = useParams<{
        category : string;
    }>();

    const {data,isError,isPending} = useCustomFetch<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
        [page, category]
    );

    if (isError) {
        console.log(page)
        return (<div>
            <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
        </div>);
    }

    return (
        <>
            
            <PageButton page={page} setPage={setPage} />

            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>)};
            
            {!isPending && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {data?.results.map((data) => (
                    <MovieCard key={data.id} movie={data} />
                    ))}
                </div>
            )} ;
        </>
    );
}
