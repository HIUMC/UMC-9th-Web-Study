import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onClick: () => void;
  cssClass?: string;
  size: number;
}

const DeleteButton = ({ onClick, cssClass, size }: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-gray-700 rounded p-1 flex items-center gap-1 text-sm w-8 h-8 cursor-pointer ${cssClass}`}
    >
      <Trash2 size={size} />
    </button>
  );
};

export default DeleteButton;
