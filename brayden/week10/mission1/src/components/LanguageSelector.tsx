import type { MovieLanguage } from "../types/movie";

interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: LanguageOption[];
  className?: string;
}
const LanguageSelector = ({
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps) => {
  return (
    <select
      className={`w-full p-2 rounded-md border border-gray-500 shadow-sm
      focus:border-blue-500 focus:ring-blue-500 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
