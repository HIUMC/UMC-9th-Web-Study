/**
 * ========================================
 * 프로필 헤더 컴포넌트 (ProfileHeader)
 * ========================================
 *
 * 마이페이지 상단에 표시되는 헤더 컴포넌트입니다.
 * 프로필 아이콘, 제목, 설명, 설정 버튼을 포함합니다.
 */

interface ProfileHeaderProps {
  onEditClick?: () => void; // 설정 버튼 클릭 핸들러
  avatar?: string | null; // 프로필 이미지 URL
}

/**
 * 프로필 헤더 컴포넌트
 * 마이페이지의 시각적 헤더를 렌더링
 */
export default function ProfileHeader({
  onEditClick,
  avatar,
}: ProfileHeaderProps) {
  return (
    <div className="text-center mb-8 relative">
      {/* 설정 버튼 (우측 상단) */}
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
          title="프로필 수정"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      )}

      {/* 프로필 아이콘: 원형 배경에 사용자 이미지 또는 이모지 */}
      <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
        {avatar ? (
          <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-white">👤</span>
        )}
      </div>

      {/* 페이지 제목 */}
      <h1 className="text-3xl font-bold text-white mb-2">마이페이지</h1>

      {/* 페이지 설명 */}
      <p className="text-gray-300">사용자 정보를 확인할 수 있습니다</p>
    </div>
  );
}
