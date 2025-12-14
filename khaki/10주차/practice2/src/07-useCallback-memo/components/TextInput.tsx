import { memo } from "react";

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링됨");

  return (
    <input
      type="text"
      className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
      onChange={(e): void => onChange(e.target.value)}
    />
  );
};

export default memo(TextInput);
