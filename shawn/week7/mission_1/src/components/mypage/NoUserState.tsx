/**
 * ========================================
 * 사용자 없음 상태 컴포넌트 (NoUserState)
 * ========================================
 *
 * 사용자 정보가 없을 때 표시되는 화면 컴포넌트입니다.
 * 로그인이 필요함을 안내하고 로그인 페이지로 이동하는 버튼을 제공합니다.
 */

/**
 * NoUserState 컴포넌트의 props 타입
 */
interface NoUserStateProps {
  onLogin: () => void; // 로그인 버튼 클릭 핸들러
}

/**
 * 사용자 없음 상태 컴포넌트
 * 사용자 정보가 없을 때 전체 화면에 안내 메시지와 로그인 버튼 표시
 *
 * @param onLogin - 로그인 버튼 클릭 시 실행될 함수
 */
export default function NoUserState({ onLogin }: NoUserStateProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* 사용자 아이콘 */}
        <div className="text-gray-400 text-6xl mb-4">👤</div>

        {/* 안내 제목 */}
        <h2 className="text-2xl font-bold text-white mb-2">
          사용자 정보가 없습니다
        </h2>

        {/* 안내 메시지 */}
        <p className="text-gray-300 mb-6">다시 로그인해주세요.</p>

        {/* 로그인 버튼 */}
        <button
          onClick={onLogin}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
