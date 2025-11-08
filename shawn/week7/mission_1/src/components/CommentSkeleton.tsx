/**
 * ========================================
 * 댓글 스켈레톤 컴포넌트 (CommentSkeleton)
 * ========================================
 *
 * 댓글 로딩 중에 표시되는 플레이스홀더 컴포넌트입니다.
 * 실제 댓글의 레이아웃을 모방하여 로딩 상태를 시각적으로 표현합니다.
 *
 * 주요 기능:
 * 1. 프로필 이미지, 사용자 이름, 댓글 내용의 로딩 상태 표시
 * 2. 애니메이션 효과로 로딩 중임을 나타냄
 * 3. 실제 댓글과 유사한 레이아웃 제공
 */

/**
 * 댓글 스켈레톤 컴포넌트
 * 댓글 데이터 로딩 중 사용자에게 시각적 피드백을 제공
 */
export default function CommentSkeleton() {
  return (
    <div className="animate-pulse py-4 border-b border-[#2a2a2a]">
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 스켈레톤: 원형 이미지 모양 */}
        <div className="w-10 h-10 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-full shimmer flex-shrink-0" />

        <div className="flex-1 space-y-3">
          {/* 사용자 이름 스켈레톤: 짧은 텍스트 (고정 너비) */}
          <div className="h-4 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-24 shimmer" />

          {/* 댓글 내용 스켈레톤: 여러 줄 텍스트 모양 */}
          <div className="space-y-2">
            {/* 첫 번째 줄: 전체 너비 */}
            <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-full shimmer" />
            {/* 두 번째 줄: 75% 너비 (마지막 줄이 짧은 효과) */}
            <div className="h-3 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded w-3/4 shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
