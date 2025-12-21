import { memo, useState } from "react";
import type { MovieFilters } from "../types/movie";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

// 영화검색 필터값을 입력받아 부모에 전달하는 컴포넌트
const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  console.log("MovieFilter 렌더링");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const filter: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filter);
  };

  return (
    <div className="min-w-dvh mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">영화 제목</label>
            <Input value={query} onChange={setQuery} placeholder="영화 제목을 입력하세요" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">언어</label>
              <LanguageSelector
                value={language}
                onChange={setLanguage}
                options={LANGUAGE_OPTIONS}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">옵션</label>
              <div className="flex h-[42px] items-center">
                <SelectBox
                  checked={includeAdult}
                  onChange={setIncludeAdult}
                  label="성인 콘텐츠 포함"
                  id="include-adult"
                  className="flex items-center gap-2"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(MovieFilter);
