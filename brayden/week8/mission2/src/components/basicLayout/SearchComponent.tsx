import { Search } from "lucide-react";

interface SearchComponentProps {
  isSearch: boolean;
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent = ({
  isSearch,
  search,
  handleSearch,
}: SearchComponentProps) => {
  return (
    <>
      {isSearch && (
        <>
          <div className="flex">
            <Search size={25} className="text-white ml-8" />
            <input
              className="w-xl justify-center flex outline-0 caret-white ml-2 text-white"
              autoFocus // 자동 커서 깜박임
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="w-xl justify-center flex border-b-1 border-white "></div>
        </>
      )}
    </>
  );
};

export default SearchComponent;
