import { UserCircle } from "lucide-react";
import React, { useState } from "react";
import CommentOption from "./CommentOption";
import InputComponent from "../../ModalComponent/InputComponent";
import type { CommentType } from "../../../types/comment";
import usePatchComment from "../../../hooks/mutations/comment/usePatchComment";
import useDeleteComment from "../../../hooks/mutations/comment/useDeleteComment";

interface CommentProps {
  data: CommentType;
  meData?: number;
}

const Comment = ({ data, meData }: CommentProps) => {
  const avatar = data.author.avatar;
  const authorName = data.author.name;
  const authorId = data.authorId;
  const commetContent = data.content;
  const commentId = data.id;
  const lpid = data.lpId;

  const [isOption, setIsOption] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(data.content);

  const { mutate: patchComment } = usePatchComment();
  const { mutate: deleteComment } = useDeleteComment();

  const handleDelete = () => {
    deleteComment(
      { lpid, commentId },
      {
        onSuccess: () => setIsOption(false),
        onError: () => alert("댓글 삭제에 실패했습니다."),
      }
    );
  };

  const handleEdit = () => {
    setIsOption(false);
    setIsEditing(true);
    setEditComment(data.content); // 기존 내용 유지
  };

  const handleEditComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };

  const handleEditComplete = () => {
    patchComment(
      { lpid, commentId, content: editComment },
      {
        onSuccess: () => {
          setIsEditing(false);
          setIsOption(false);
        },
        onError: () => alert("댓글 수정에 실패했습니다."),
      }
    );
  };

  const handleOption = () => setIsOption((prev) => !prev);

  return (
    <div key={data.id} className="flex flex-row w-full gap-2">
      <div className="flex justify-center items-center">
        {avatar ? (
          <img
            src={avatar}
            alt={authorName}
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <UserCircle />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div>{authorName}</div>
        <div>
          {!isEditing ? (
            commetContent
          ) : (
            <InputComponent
              classname="flex-1"
              value={editComment}
              onChange={handleEditComment}
              onEnterPress={handleEditComplete}
            />
          )}
        </div>
      </div>

      <CommentOption
        isOption={isOption}
        isEditing={isEditing}
        meData={meData}
        authorId={authorId}
        onChange={handleOption}
        onDelete={handleDelete}
        onModify={handleEdit}
        onEditComplete={handleEditComplete}
      />
    </div>
  );
};

export default Comment;
