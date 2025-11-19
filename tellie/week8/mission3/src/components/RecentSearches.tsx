import { Clock, X } from "lucide-react";

interface RecentSearchesProps {
    recentSearches: string[];
    onSearchClick: (search: string) => void;
    onRemoveSearch: (search: string) => void;
    onClearAll: () => void;
}

const RecentSearches = ({ 
    recentSearches, 
    onSearchClick, 
    onRemoveSearch, 
    onClearAll 
}: RecentSearchesProps) => {
    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400 font-medium">
                    최근 검색어
                </span>
                <button
                    onClick={onClearAll}
                    className="text-xs text-gray-500 hover:text-gray-300"
                >
                    전체삭제
                </button>
            </div>
            <div className="space-y-0">
                {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                        <button
                            onClick={() => onSearchClick(search)}
                            className="flex-1 flex items-center text-left text-gray-300 hover:text-white transition-colors"
                        >
                            <Clock size={14} className="mr-3 text-gray-500" />
                            <span className="text-sm">{search}</span>
                        </button>
                        <button
                            onClick={() => onRemoveSearch(search)}
                            className="ml-2 p-1 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;