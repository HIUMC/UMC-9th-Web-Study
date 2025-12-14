import type { MovieLanguage, MovieFilters } from "../types/movie";
import { memo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import LanguageSelector from "./LanguageSelector";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl transform space-y-4 rounded-2xl border border-gray-300 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} placeholder="영화 제목을 입력하세요" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
      >
        <Search size={20} />
        검색하기
      </button>
    </form>
  );
};

export default memo(MovieFilter);