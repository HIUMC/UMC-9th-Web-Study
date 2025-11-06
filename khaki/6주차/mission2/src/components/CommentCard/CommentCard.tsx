interface CommentCardProps {
  id: number;
  content: string;
  author: {
    name: string;
  };
}

export const CommentCard = ({ id, content, author }: CommentCardProps) => {
  return (
    <div key={id} className="bg-neutral-700 p-4 rounded mb-2">
      <p className="text-gray-300 text-sm mb-2">{author.name}</p>
      <p className="text-white">{content}</p>
    </div>
  );
};
