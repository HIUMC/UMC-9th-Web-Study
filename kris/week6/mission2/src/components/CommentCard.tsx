import type { LpComment } from "../types/lp"

interface CommentCardProps { 
  comment: LpComment;
}

export const CommentCard = ({comment}: CommentCardProps) => {
  return (
    <div className="flex flex-row items-center space-x-4 space-y-2 mb-6">
      <img src={comment.author.avatar} alt="" className="w-8 h-8 rounded-full"/>
      <div className="flex flex-col items-left">
        <h3 className="text-md">{comment.author.name}</h3>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div> 
  )
}