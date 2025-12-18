import { memo, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    console.log(filters);
    onChange(filters);
  };

  return (
    <div>
      <div className="transform space-y-6 rounded-2xl border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-wrap gap-6">
            <div className="min-w-[450px] flex-1">
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                검색어
              </label>
              <Input
                value={query}
                onChange={setQuery}
                placeholder="영화 제목을 입력하세요"
              />
            </div>
            <div className="min-w-[250px] flex-1">
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                옵션
              </label>
              <SelectBox
                checked={includeAdult}
                onChange={setIncludeAdult}
                label="성인 영화 포함"
                id="include_adult"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="min-w-[250px] flex-1">
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                언어
              </label>
              <LanguageSelector
                value={language}
                onChange={setLanguage}
                options={LANGUAGE_OPTIONS}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <button onClick={handleSubmit}>검색</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
