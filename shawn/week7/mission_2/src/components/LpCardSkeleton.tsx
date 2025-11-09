/**
 * ========================================
 * LP 카드 스켈레톤 컴포넌트 (LpCardSkeleton)
 * ========================================
 *
 * LP 목록 로딩 중에 표시되는 플레이스홀더 컴포넌트입니다.
 * 실제 LP 카드의 레이아웃을 모방하여 로딩 상태를 시각적으로 표현합니다.
 *
 * 주요 기능:
 * 1. 썸네일, 제목, 내용의 로딩 상태 표시
 * 2. 애니메이션 효과로 로딩 중임을 나타냄
 * 3. 실제 카드와 유사한 레이아웃 제공
 */

/**
 * LP 카드 스켈레톤 컴포넌트
 * 데이터 로딩 중 사용자에게 시각적 피드백을 제공하여 UX 개선
 */
export default function LpCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 썸네일 스켈레톤: 정사각형 비율로 로딩 표시 */}
      <div className="w-full aspect-square bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-2 shimmer" />

      {/* 제목 스켈레톤: 한 줄 텍스트 모양 */}
      <div className="h-4 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded mb-2 shimmer" />

      {/* 내용 스켈레톤: 짧은 텍스트 모양 (75% 너비) */}
      <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-3/4 shimmer" />
    </div>
  );
}
