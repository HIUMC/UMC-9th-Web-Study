import { PAGINATION_ORDER } from "../enums/common";

type SearchType = 'title' | 'tag';

interface SearchResultsHeaderProps {
    debouncedValue: string;
    searchType: SearchType;
    order: PAGINATION_ORDER;
    setOrder: (order: PAGINATION_ORDER) => void;
}

const SearchResultsHeader = ({ 
    debouncedValue, 
    searchType, 
    order, 
    setOrder 
}: SearchResultsHeaderProps) => {
    const searchTypeOptions = {
        title: '제목',
        tag: '태그명'
    };

    return (
        <>
            <div className="mb-6">
                <p className="text-sm text-gray-400">
                    '{debouncedValue}' 검색 결과 ({searchTypeOptions[searchType]})
                </p>
            </div>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.asc)}  
                    className={`border border-white rounded-xl px-4 py-2 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`}
                >
                    오래된순
                </button>
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.desc)}
                    className={`border border-white rounded-xl px-4 py-2 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`}
                >
                    최신순
                </button>
            </div>
        </>
    );
};

export default SearchResultsHeader;