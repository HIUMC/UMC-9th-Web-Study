import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import SearchInput from "../components/SearchInput";
import RecentSearches from "../components/RecentSearches";
import SearchResultsHeader from "../components/SearchResultsHeader";
import LpGrid from "../components/LpGrid";
import useGetLpList from "../hooks/queries/useGetLpList";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PAGINATION_ORDER } from "../enums/common";
import { useAuth } from "../context/AuthContext";
import type { Lp } from "../types/lp";

type SearchType = 'title' | 'tag';

const SearchPage = () => {
    const [searchType, setSearchType] = useState<SearchType>('title');
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    
    const debouncedValue = useDebounce(searchQuery, 300);
    
    const { userId } = useAuth();
    const { setItem, getItem, removeItem } = useLocalStorage('recentSearches');

    useEffect(() => {
        const saved = getItem();
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch {
                setRecentSearches([]);
            }
        }
    }, []);

    useEffect(() => {
        if (debouncedValue?.length > 0) {
            setRecentSearches(prev => {
                const newSearches = [debouncedValue, ...prev.filter(s => s !== debouncedValue)].slice(0, 5);
                setItem(JSON.stringify(newSearches));
                return newSearches;
            });
        }
    }, [debouncedValue]);

    const { 
        data, 
        isFetching, 
        hasNextPage, 
        isLoading: isPending, 
        fetchNextPage,
        isError 
    } = useGetLpList(
        {
            search: searchType === 'title' ? debouncedValue : undefined,
            order: order,
            limit: searchType === 'tag' ? 10000 : 20
        },
        {
            enabled: Boolean(debouncedValue?.trim())
        }
    );

    const { ref, inView } = useInView({
        threshold: 0,
    });

    // inView 상태와 시간을 조합하여 3초마다 새로운 트리거를 생성
    const [fetchTrigger, setFetchTrigger] = useState(0);
    
    // 검색어가 변경되면 fetchTrigger 리셋
    useEffect(() => {
        setFetchTrigger(0);
    }, [debouncedValue]);
    
    useEffect(() => {
        if (searchType === 'title' && inView && !isFetching && hasNextPage) {
            const timer = setTimeout(() => {
                setFetchTrigger(prev => prev + 1);
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [inView, isFetching, hasNextPage, searchType]);
    
    // fetchTrigger를 3초 간격으로 throttle
    const throttledFetchTrigger = useThrottle(fetchTrigger, 3000);
    
    useEffect(() => {
        if (throttledFetchTrigger > 0) {
            fetchNextPage();
        }
    }, [throttledFetchTrigger, fetchNextPage]);

    const handleRecentSearchClick = (search: string) => setSearchQuery(search);

    const removeRecentSearch = (searchToRemove: string) => {
        setRecentSearches(prev => {
            const updated = prev.filter(s => s !== searchToRemove);
            setItem(JSON.stringify(updated));
            return updated;
        });
    };

    const clearAllRecentSearches = () => {
        setRecentSearches([]);
        removeItem();
    };

    const getFilteredData = () => {
        if (!data?.pages || !debouncedValue?.trim()) return data;
        
        if (searchType === 'title') {
            return data;
        }
        
        const query = debouncedValue.toLowerCase().trim();
        return {
            ...data,
            pages: data.pages.map(page => ({
                ...page,
                data: {
                    ...page.data,
                    data: (page.data as any).data.filter((lp: Lp) => 
                        lp.tags?.some(tag => 
                            tag.name.toLowerCase().includes(query)
                        )
                    )
                }
            }))
        };
    };

    const filteredData = getFilteredData();

    return (
        <div className='flex flex-col items-center min-h-screen bg-black text-white'>
            <Navbar />
            
            <div className="w-full max-w-2xl mx-auto pt-16 px-6">
                <SearchInput 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchType={searchType}
                    setSearchType={setSearchType}
                />

                {!debouncedValue?.trim() && recentSearches.length > 0 && (
                    <RecentSearches 
                        recentSearches={recentSearches}
                        onSearchClick={handleRecentSearchClick}
                        onRemoveSearch={removeRecentSearch}
                        onClearAll={clearAllRecentSearches}
                    />
                )}
            </div>

            <div className="mt-10 p-10 w-full max-w-7xl">
                {debouncedValue?.trim() && (
                    <>
                        <SearchResultsHeader 
                            debouncedValue={debouncedValue}
                            searchType={searchType}
                            order={order}
                            setOrder={setOrder}
                        />
                        
                        <LpGrid 
                            ref={ref}
                            filteredData={filteredData}
                            userId={userId}
                            isPending={isPending}
                            isError={isError}
                            isFetching={isFetching}
                            hasNextPage={hasNextPage}
                        />
                    </>
                )}

                {!debouncedValue?.trim() && (
                    <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                        <div className="text-center text-gray-400">
                            <Search size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">검색어를 입력하여 원하는 LP를 찾아보세요!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;