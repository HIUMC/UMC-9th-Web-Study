import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface LanguageOptionProps {
  language: string;
  setLanguage?: (value: string) => void;
}

const languageOptions: Record<string, string> = {
  "ko-KR": "한국어",
  "en-US": "English",
  "ja-JP": "日本語",
};

const LanguageOption = ({ language, setLanguage }: LanguageOptionProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key: string) => {
    setLanguage?.(key);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-start w-full" ref={dropdownRef}>
      <span>Language</span>

      <div className="relative">

          {/* 언어 선택 박스 */}
          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            className="

              flex items-center justify-between
              border border-white/20 rounded-md
              py-[3px] w-[80px]
              bg-[#ffffff] backdrop-blur-sm
              cursor-pointer
            "
          >
            <span>{languageOptions[language]}</span>

            {/* 아이콘 회전 */}
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

        {/* 드롭다운 리스트 */}
        <div
          className={`
            absolute top-[28px] right-0 
            w-[80px] bg-[#ffffff]  text-center rounded-md border border-white/20 shadow-lg
            overflow-hidden transition-all duration-300 box-border
            ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
          `}
        >
          {Object.entries(languageOptions).map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleSelect(key)}
              className="
                px-[4px] py-[2px] cursor-pointer hover:bg-[#000000] hover:text-[#ffffff] transition cursor-pointer
              "
            >
              {value}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LanguageOption;
