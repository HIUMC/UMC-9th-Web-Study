/**
 * ========================================
 * 프로필 헤더 컴포넌트 (ProfileHeader)
 * ========================================
 *
 * 마이페이지 상단에 표시되는 헤더 컴포넌트입니다.
 * 프로필 아이콘, 제목, 설명을 포함합니다.
 */

/**
 * 프로필 헤더 컴포넌트
 * 마이페이지의 시각적 헤더를 렌더링
 */
export default function ProfileHeader() {
  return (
    <div className="text-center mb-8">
      {/* 프로필 아이콘: 원형 배경에 사용자 이모지 */}
      <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl text-white">👤</span>
      </div>

      {/* 페이지 제목 */}
      <h1 className="text-3xl font-bold text-white mb-2">마이페이지</h1>

      {/* 페이지 설명 */}
      <p className="text-gray-300">사용자 정보를 확인할 수 있습니다</p>
    </div>
  );
}
