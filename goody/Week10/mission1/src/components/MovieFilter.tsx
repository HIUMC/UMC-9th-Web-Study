import { memo, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie"
import { Input } from "./input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange : (filter : MovieFilters) => void;
}


const MovieFilter = ({onChange} : MovieFilterProps) => {
  console.log("리렌더링, MoviteFilter")

  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white
    p-6 shadow-xl transition-all hover:shadow-2xl">
      <form  onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery}/>
        </div>
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            🛠️옵션
          </label>
          <SelectBox 
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focuse:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            🌐언어
          </label>
          <LanguageSelector
            value={language}
            onChange={(value: string) => setLanguage(value as MovieLanguage)}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focuse:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="pt-4">
          <button type="submit" className="cursor-pointer">
            영화 검색
          </button>
        </div>
      </form>
    </div>
  )
}

// useCallback or useMemo 사용해 리렌더링 방지하려면
// 반드시 memo로 감싸줘야함.
// 컴포넌트가 항상 props의 변경여부를 확인한 뒤 실행 여부 판단
// 기본은 변경여부 확인 X
export default memo(MovieFilter);
