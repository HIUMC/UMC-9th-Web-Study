// components/Comment/CommentInputBox.tsx
import { useState } from "react";
import InputComponent from "../../ModalComponent/InputComponent";
import AddButton from "../../common/AddButton";
import usePostCreateComment from "../../../hooks/mutations/usePostCreateComment";

interface CommentInputProps {
  lpId: number;
}

const CommentInput = ({ lpId }: CommentInputProps) => {
  const [newComment, setNewComment] = useState("");
  const { mutate: commentMutate } = usePostCreateComment();

  const handleSetNewComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleCreateComment = () => {
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    commentMutate(
      { lpid: lpId, content: newComment },
      {
        onSuccess: () => setNewComment(""),
        onError: () => alert("댓글 등록에 실패했습니다."),
      }
    );
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-[88%]">
        <InputComponent
          inputComment="댓글을 입력해주세요"
          value={newComment}
          onChange={handleSetNewComment}
        />
      </div>
      <div className="mr-1">
        <AddButton onClick={handleCreateComment} buttonText="작성" />
      </div>
    </div>
  );
};

export default CommentInput;
