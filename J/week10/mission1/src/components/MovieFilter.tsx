import { memo, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie"
import { Input } from "./Input";
import { Globe, Settings } from "lucide-react";
import { SelectBox } from "./SelectBox";
import { LanguageSelector } from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
    onChange: (filter: MovieFilters) => void;
}

export const MovieFilter = memo(({onChange}: MovieFilterProps) => {
    console.log("Movie Filter 리렌더링")
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
        <form
            onSubmit={handleSubmit}
            className="transform space-y-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
        >
            <div className="flex flex-wrap gap-6">
                <div className="min-w-[250px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        영화 제목
                    </label>
                    <Input value={query} onChange={setQuery} />
                </div>
                <div className="min-w-[250px] flex-1">
                    <label className="flex items-center mb-2 block text-sm font-medium text-gray-700 flex flex-row gap-1 mt-auto">
                        <Settings size={16}/>옵션
                    </label>
                    <SelectBox
                        checked={includeAdult}
                        onChange={setIncludeAdult}
                        label="성인 컨텐츠 표시"
                        id="include_adult"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="min-w-[250px] flex-1">
                    <label className="flex items-center mb-2 block text-sm font-medium text-gray-700 flex flex-row gap-1 mt-auto">
                        <Globe size={16}/>언어
                    </label>
                    <LanguageSelector
                        value={language}
                        onChange={setLanguage}
                        options={LANGUAGE_OPTIONS}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full p-3 rounded-lg bg-blue-600 text-white text-lg font-medium flex justify-center cursor-pointer hover:bg-blue-700"
            >
                검색하기
            </button>
        </form>
    )
});