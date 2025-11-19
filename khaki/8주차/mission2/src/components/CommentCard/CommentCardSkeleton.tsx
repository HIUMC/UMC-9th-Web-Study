export const CommentCardSkeleton = () => {
  return (
    <div className="bg-neutral-700 p-4 rounded mb-2 animate-pulse">
      {/* 작성자 이름 스켈레톤 */}
      <div className="h-4 bg-gray-400 rounded w-1/4 mb-2"></div>
      {/* 댓글 내용 스켈레톤 */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};
