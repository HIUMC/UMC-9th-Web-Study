const CommentSkeleton = () => {
  return (
    <div className="p-4 w-full animate-pulse">
      <div className="bg-gray-800 p-7 rounded-lg">
        <div className="flex items-center mb-2">
          <div className="bg-gray-400 rounded-3xl" />
          <div className="bg-gray-400 rounded-3xl" />
        </div>
        <div className="bg-gray-400 rounded-3xl" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
