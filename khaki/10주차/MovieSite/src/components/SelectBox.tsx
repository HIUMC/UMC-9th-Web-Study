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
  id = 'checkbox',
  className,
}: SelectBoxProps) => {
  return (
    <div className={'flex items-center ${className}'}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`size-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:ring-blue-500 ${className}`}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
};
