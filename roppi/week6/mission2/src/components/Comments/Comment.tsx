import { timeAgo } from "../../utils/timeAgo";

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
  };
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div key={comment.id} className="border-b border-gray-700 pb-2">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">{comment.author.name}</span>
        <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
      </div>
      <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
    </div>
  );
};

export default Comment;
