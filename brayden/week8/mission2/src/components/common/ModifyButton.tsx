import { Pencil } from "lucide-react";

interface ModifyButtonProps {
  onClick: () => void;
  cssClass?: string;
  size: number;
}

const ModifyButton = ({ onClick, cssClass, size }: ModifyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-gray-700 rounded p-1 flex items-center gap-1 text-sm cursor-pointer ${cssClass}`}
    >
      <Pencil size={size} />
    </button>
  );
};

export default ModifyButton;
