import { memo, useState } from "react";
import { type MovieFilters } from "../types/movie";
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
  const [language, setLanguage] = useState<string>("ko-KR");

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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-xl"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          영화 제목
        </label>
        <Input value={query} onChange={setQuery} />
      </div>

      <div className="flex flex-wrap items-end gap-8">
        <div className="min-w-[220px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
          />
        </div>

        <div className="min-w-[220px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>

        <button
          type="submit"
          className="h-10 w-20 rounded-lg bg-black text-white cursor-pointer"
        >
          검색
        </button>
      </div>
    </form>
  );
};

export default memo(MovieFilter);
