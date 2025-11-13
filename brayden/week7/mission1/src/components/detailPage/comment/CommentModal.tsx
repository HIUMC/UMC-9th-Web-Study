// components/Comment/CommentModal.tsx
import Modal from "../../ModalComponent/Modal";
import SortButton from "../../common/SortButton";
import CommentInputBox from "./CommentInput";
import CommentList from "./CommentList";
import { useState } from "react";

interface CommentModalProps {
  lpId: number;
  onClose: () => void;
}

const CommentModal = ({ lpId, onClose }: CommentModalProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  return (
    <Modal onClick={onClose} variant="comment">
      <div className="flex flex-col w-2xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-2">
          <span className="text-lg font-semibold text-white">댓글</span>
          <SortButton order={order} onSortChange={setOrder} />
        </div>

        {/* Input */}
        <CommentInputBox lpId={lpId} />

        {/* List */}
        <div className="mt-4">
          <CommentList lpId={lpId} order={order} />
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
