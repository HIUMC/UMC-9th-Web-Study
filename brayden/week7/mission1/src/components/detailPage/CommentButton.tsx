// components/Comment/CommentButton.tsx
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import CommentModal from "./comment/CommentModal";

interface CommentButtonProps {
  lpId: number;
}

const CommentButton = ({ lpId }: CommentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>
        <MessageCircle className="cursor-pointer" fill="currentColor" />
      </button>

      {isOpen && <CommentModal lpId={lpId} onClose={handleClose} />}
    </>
  );
};

export default CommentButton;
