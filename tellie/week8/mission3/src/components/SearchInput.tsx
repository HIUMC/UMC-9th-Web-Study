import { useRef, useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

type SearchType = 'title' | 'tag';

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: SearchType;
    setSearchType: (type: SearchType) => void;
}

const SearchInput = ({
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType
}: SearchInputProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const searchTypeOptions = {
        title: '제목',
        tag: '태그명'
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsDropdownOpen]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`${searchTypeOptions[searchType]}으로 검색`}
                    className="w-full h-10 pl-10 pr-3 bg-transparent border-b border-gray-600 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-400"
                />
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-10 px-3 bg-gray-800 text-white text-sm flex items-center gap-1 hover:bg-gray-700 rounded"
                >
                    <span>{searchTypeOptions[searchType]}</span>
                    <ChevronDown size={14} />
                </button>
                
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 z-10 w-20 bg-gray-800 border border-gray-700 rounded-b">
                        {Object.entries(searchTypeOptions).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSearchType(key as SearchType);
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 ${
                                    searchType === key ? 'bg-gray-700' : ''
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchInput;