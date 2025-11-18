import { timeAgo } from "../../utils/timeAgo";
import { useState } from "react";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import { useAuth } from "../../context/AuthContext";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useDeleteComment } from "../../hooks/mutations/useDeleteComment";
import { useEditComment } from "../../hooks/mutations/useEditComment";

interface CommentProps {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    author: {
      id: number;
      name: string;
      avatar: string;
    };
  },
  lpId :number,
}

const Comment = ({ comment, lpId }: CommentProps) => {
  const [isModal, setIsModal] = useState(false);
  const { accessToken } = useAuth();
  const { data: meData } = useGetMyInfo(accessToken);
  const myId = meData?.data?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: editCommentMutate } = useEditComment();

  const handleDelete = () => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      deleteCommentMutate({ lpId, commentId: comment.id });
    }
  };

  const handleEdit = () => {
    if (!editText.trim()) return alert("내용을 입력하세요!");
    editCommentMutate(
      { lpId, commentId: comment.id, content: editText },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleModal = () => {
    setIsModal((prev)=> !prev)
  }
  return (
    <div key={comment.id} className="relative border-b border-gray-700 pb-2">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">{comment.author.name}</span>
          <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
        </div>
    {isEditing ? (<div className="flex gap-1 mt-1">
        <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full outline-none bg-[#202020] border border-gray-600 rounded px-2  text-sm text-white"
          />
          <div className="flex gap-0 text-xs">
            <button
              onClick={handleEdit}
              className="text-pink-400 hover:opacity-80 w-5 text-[9px]"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(comment.content);
              }}
              className="text-gray-400 hover:opacity-80 w-5 text-[9px]"
            >
              취소
            </button>
          </div>
    </div>) : (<div>
        <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
    </div>)}
        

       {myId === comment.author.id && !isEditing && (
  <>
    <div
      onClick={handleModal}
      className="w-1 h-5 bg-pink-500 absolute bottom-2 right-2 cursor-pointer"
    ></div>

    {isModal && (
      <div className="absolute rounded px-1 right-5 bottom-2 bg-pink-500 opacity-50 flex">
        <img
          src={editIcon}
          onClick={() => setIsEditing(true)} 
          className="w-5 hover:opacity-45 cursor-pointer"
        />
        <img
          src={deleteIcon}
          onClick={handleDelete}
          className="w-5 hover:opacity-45 cursor-pointer"
        />
      </div>
    )}
  </>
)}

        </div>
  );
};

export default Comment;
