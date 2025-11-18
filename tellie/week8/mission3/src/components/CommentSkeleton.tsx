const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 mb-4 pb-4 border-b border-gray-700">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 animate-shimmer"></div>
      
      {/* 텍스트 스켈레톤 */}
      <div className="flex-1">
        {/* 이름 */}
        <div className="h-4 bg-gray-800 rounded w-24 mb-2 animate-shimmer"></div>
        
        {/* 댓글 텍스트 */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded w-full animate-shimmer"></div>
          <div className="h-3 bg-gray-800 rounded w-4/5 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
