export default function CommentSkeleton() {
  return (
    <div className="animate-pulse py-4 border-b border-[#2a2a2a]">
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-10 h-10 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-full shimmer flex-shrink-0" />

        <div className="flex-1 space-y-3">
          {/* 사용자 이름 스켈레톤 */}
          <div className="h-4 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-24 shimmer" />

          {/* 댓글 내용 스켈레톤 */}
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-full shimmer" />
            <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-3/4 shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
