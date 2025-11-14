import { useState } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { usePatchComment } from "../hooks/mutations/usePatchComment";
import { useParams } from "react-router-dom";
import { useDeleteComment } from "../hooks/mutations/useDeleteComment";

interface MyCommentProps {
  id: number;
  author: string;
  content: string;
  createdAt?: string;
  avatarUrl?: string | null;
  refetchComments?: () => void;
}

export default function MyComment({
  id,
  author,
  content,
  createdAt,
  avatarUrl,
  refetchComments,
}: MyCommentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(content);

  const { lpId } = useParams<{ lpId: string }>();
  const { mutate: editComment } = usePatchComment(Number(lpId));
  const { mutate: deleteComment } = useDeleteComment(Number(lpId));

  const handleEditSubmit = () => {
    if (editText.trim() === "") return;
    editComment(
      { commentId: id, content: editText },
      {
        onSuccess: () => {
          refetchComments?.();
          setIsEdit(false);
          setIsMenuOpen(false);
        },
      }
    );
  };

  const handleDeleteSubmit = () => {
    const ok = window.confirm("댓글을 삭제하시겠어요?");
    if (!ok) return; // 취소 누르면 삭제 중단

    deleteComment(id, {
      onSuccess: () => {
        refetchComments?.();
        setIsMenuOpen(false);
      },
    });
  };

  return (
    <>
      <div className="relative flex flex-row items-center w-full p-4">
        <img
          className="size-12 rounded-full mr-4"
          src={
            avatarUrl
              ? avatarUrl
              : "https://www.gravatar.com/avatar/?d=mp&s=200"
          }
        />
        <div className="text-white flex flex-col gap-2">
          <h1 className=" text-lg">{author}</h1>
          {isEdit ? (
            <div className="flex gap-2">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-110  border border-white rounded-md p-2 text-white"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="text-white px-3 py-1 rounded-md text-sm"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-base">{content}</p>
          )}
        </div>
        <div className="text-white absolute top-0 right-25 text-xl font-bold">
          <button
            className="cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ...
          </button>
        </div>
        {isMenuOpen && (
          <div className="text-white bg-black rounded-md w-15 h-8 flex justify-center items-center gap-2 absolute right-20 top-8">
            <button
              className="cursor-pointer"
              onClick={() => {
                setIsEdit(true);
                setIsMenuOpen(false);
              }}
            >
              <FaPen size={18} />
            </button>
            <button className="cursor-pointer">
              <FaTrash size={18} onClick={handleDeleteSubmit} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
