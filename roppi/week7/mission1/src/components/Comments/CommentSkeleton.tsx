const CommentSkeleton = () => {
  return (
    <div className="relative flex flex-col gap-2 p-4 w-full h-16 animate-pulse">
      <div className="bg-gray-400 rounded h-4 w-1/3" />
      <div className="bg-gray-400 rounded h-4 w-full" />
    </div>
  );
}

export default CommentSkeleton;