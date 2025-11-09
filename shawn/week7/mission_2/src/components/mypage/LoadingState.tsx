/**
 * ========================================
 * 로딩 상태 컴포넌트 (LoadingState)
 * ========================================
 *
 * 사용자 정보를 불러오는 동안 표시되는 로딩 화면 컴포넌트입니다.
 * 회전하는 스피너 애니메이션과 안내 메시지를 표시합니다.
 */

/**
 * 로딩 상태 컴포넌트
 * 사용자 정보 로딩 중에 전체 화면에 로딩 인디케이터 표시
 */
export default function LoadingState() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* 회전하는 로딩 스피너 */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>

        {/* 로딩 메시지 */}
        <p className="text-gray-300">사용자 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}
