import { Check } from "lucide-react";

interface SelectBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    id?: string;
    className?: string;
}

export const SelectBox = ({
    checked,
    onChange,
    label,
    id = "checkbox",
    className,
}: SelectBoxProps) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                id={id}
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative size-5 rounded border-2 transition-colors ${
                    checked
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white hover:border-blue-400"
                }`}
            >
                {checked && <Check size={16} className="absolute inset-0 m-auto text-white" />}
            </button>
            <label htmlFor={id} className="cursor-pointer text-gray-700 select-none">
                {label}
            </label>
        </div>
    );
};