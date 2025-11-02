export default function LpCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 썸네일 스켈레톤 */}
      <div className="w-full aspect-square bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-2 shimmer" />
      {/* 제목 스켈레톤 */}
      <div className="h-4 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded mb-2 shimmer" />
      {/* 내용 스켈레톤 */}
      <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-3/4 shimmer" />
    </div>
  );
}
