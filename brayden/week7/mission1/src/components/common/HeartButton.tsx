import { HeartIcon } from "lucide-react";

interface HeartButtonProps {
  likesCount: number;
  islpCard?: boolean;
  isLiked?: boolean;
  onClicked?: () => void;
}

const HeartButton = ({
  likesCount,
  islpCard = false,
  isLiked = false,
  onClicked,
}: HeartButtonProps) => {
  return (
    <div className="flex flex-row gap-0.5">
      <button className="cursor-pointer" onClick={onClicked}>
        <HeartIcon
          className={isLiked ? "text-pink-400" : "none"}
          fill={isLiked ? "currentColor" : "none"}
          size={islpCard ? 15 : 28}
        />
      </button>
      <span>{likesCount}</span>
    </div>
  );
};

export default HeartButton;
