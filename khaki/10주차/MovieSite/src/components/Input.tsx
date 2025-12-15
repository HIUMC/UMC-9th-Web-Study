import type { InputHTMLAttributes } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export const Input = ({ value, onChange, className = "", ...rest }: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${className}`}
      {...rest}
    />
  );
};