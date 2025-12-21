interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  classname?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  classname,
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-md border border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${classname}`}
    />
  );
};
