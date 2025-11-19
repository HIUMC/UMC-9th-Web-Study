import type { LpComment } from "../types/lp"
import { CheckIcon, Ellipsis, PencilIcon, Trash, X } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePatchLpComment from "../hooks/mutations/usePatchLpComment";
import { useState } from "react";
import useDeleteLpComment from "../hooks/mutations/useDeleteLpComment";

interface CommentCardProps { 
  comment: LpComment;
}

export const CommentCard = ({comment}: CommentCardProps) => {
  const {accessToken} = useAuth()
  const {data: me} = useGetMyInfo(accessToken);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(comment.content);

  const {mutate: patchLpComment} = usePatchLpComment(comment.lpId, comment.id);

  const {mutate: deleteLpComment} = useDeleteLpComment(comment.lpId, comment.id);

  const handleEditComment = () => {
    setIsMenuModalOpen(false);
    setIsEditing(true);
  }

  const handleSubmitEditComment = () => {
    const newContent = editedCommentText.trim();
    if(!newContent) return;
    
    patchLpComment(newContent);
    setIsEditing(false);
  }

  const handleCancelEditComment = () => {
    setEditedCommentText(comment.content);
    setIsEditing(false);
  }

  const handleDeleteComment = () => {
    deleteLpComment();
    setIsMenuModalOpen(false);
  }

  return (
    <div className="flex flex-row justify-between items-center space-y-2 mb-6">
      <div className="flex flex-row space-x-4 items-center">
        <img src={comment.author.avatar} alt="" className="w-8 h-8 rounded-full"/>
        <div className="flex flex-col items-left">
          <h3 className="text-md">{comment.author.name}</h3>
          {isEditing ? (
            <>
            <input type="text" className="w-full border-1 border-white px-3 py-1 my-1 text-sm rounded-md" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)}/>
            </>
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}
          
        </div>
      </div>
      {comment.author.id === me?.data.id && (
        <div>
          {!isEditing && (
            <Ellipsis className="scale-90 cursor-pointer" onClick={() => setIsMenuModalOpen((prev) => !prev)}/>
          )}
          {isEditing && (
            <div className="flex flex-row">
              <CheckIcon className="scale-80 cursor-pointer" onClick={handleSubmitEditComment}/>
              <X className="scale-80 cursor-pointer" onClick={handleCancelEditComment}/>
            </div>
          )}
          {isMenuModalOpen && (
            <div className="absolute flex flex-row space-x-1 m-1 p-1 bg-black rounded-md">
              <PencilIcon className="scale-80 cursor-pointer" onClick={handleEditComment}/>
              <Trash className="scale-80 cursor-pointer" onClick={handleDeleteComment}/>
            </div>
          )}
        </div>
      )}
    </div> 
  )
}