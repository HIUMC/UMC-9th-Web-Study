import { useState } from "react";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import usePatchComment from "../../hooks/mutations/usePatchComment";

interface CommentCardProps {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  currentUserId?: number;
  lpId?: number;
}

export const CommentCard = ({ id, content, author, currentUserId, lpId }: CommentCardProps) => {
  const isMine = currentUserId !== undefined && currentUserId === author.id;
  const [fixDelete, setfixDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(content);
  const { mutate: deleteMutate } = useDeleteComment();
  const { mutate: patchMutate } = usePatchComment();

  return (
    <div key={id} className="bg-neutral-700 p-4 rounded mb-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-300 text-sm">{author.name}</p>
        {isMine ? (
          <button className="relative text-white" onClick={() => setfixDelete(!fixDelete)}>
            ...
          </button>
        ) : null}
        {fixDelete ? (
          <div className="absolute bg-gray-800 border border-white rounded-2xl mt-20 right-20 flex">
            <button
              className="px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => {
                setIsEditing(true);
                setfixDelete(false);
                setEditContent(content);
              }}
            >
              수정
            </button>
            <button
              onClick={() => lpId && deleteMutate({ lpId, commentId: id })}
              className="px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="px-3 py-2 rounded bg-neutral-600 text-white border border-neutral-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!lpId) return console.warn("lpId is missing for patching comment");
                if (editContent.trim() === "") return;
                patchMutate({ lpId, commentId: id, content: editContent }, { onSuccess: () => setIsEditing(false) });
              }}
              disabled={!editContent}
              className="px-2 py-1 bg-green-600 text-white rounded disabled:opacity-50"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(content);
              }}
              className="px-2 py-1 bg-neutral-600 text-white rounded"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">{content}</p>
      )}
    </div>
  );
};
