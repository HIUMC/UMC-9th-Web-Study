import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import LpCardSkeleton from "./LpCardSkeleton";
import type { Lp } from "../types/lp";

interface LpGridProps {
    filteredData: any;
    userId?: number;
    isPending: boolean;
    isError: boolean;
    isFetching: boolean;
    hasNextPage: boolean;
}

const LpGrid = forwardRef<HTMLDivElement, LpGridProps>(({ 
    filteredData, 
    userId, 
    isPending, 
    isError, 
    isFetching, 
    hasNextPage 
}, ref) => {
    const navigate = useNavigate();

    if (isPending) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array(12).fill(0).map((_, i) => (
                    <LpCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                <div className="text-red-500">검색 중 오류가 발생했습니다.</div>
            </div>
        );
    }

    if (!filteredData || filteredData?.pages?.[0]?.data?.data?.length === 0) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                <div className="text-gray-400">검색 결과가 없습니다.</div>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredData?.pages?.flatMap((page: any) =>
                    page.data.data.map((lp: Lp) => (
                        <div 
                            key={lp.id} 
                            className="aspect-square relative group cursor-pointer overflow-hidden transform transition-transform duration-200 hover:scale-105"
                            onClick={() => navigate(`/lp/${lp.id}`)}
                        >
                            <img 
                                src={lp.thumbnail}
                                alt={lp.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all">
                                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                                    <h3 className="text-lg">{lp.title}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <span>{new Date(lp.updatedAt).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-1">
                                            <Heart
                                                size={16}
                                                fill={userId && lp.likes?.some(like => like.userId === userId) ? "currentColor" : "none"}
                                                className="text-pink-500"
                                            />
                                            <span>{lp.likes?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ))
                ) || []}
            </div>

            <div ref={ref} className="mt-4" />
            {isFetching && hasNextPage && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {Array(6).fill(0).map((_, i) => (
                        <LpCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </div>
            )}
        </>
    );
});

LpGrid.displayName = 'LpGrid';

export default LpGrid;