import { Check } from "lucide-react";

interface CheckButtonProps {
  cssClass?: string;
  onClick: () => void;
  size: number;
}

const CheckButton = ({ cssClass, onClick, size }: CheckButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition flex items-center justify-center ${cssClass}`}
    >
      <Check size={size} />
    </button>
  );
};

export default CheckButton;
