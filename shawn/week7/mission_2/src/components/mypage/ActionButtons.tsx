/**
 * ========================================
 * 액션 버튼 컴포넌트 (ActionButtons)
 * ========================================
 *
 * 마이페이지에서 사용자가 수행할 수 있는 액션 버튼들을 제공하는 컴포넌트입니다.
 * 홈으로 이동, 로그아웃 버튼을 포함합니다.
 */

/**
 * ActionButtons 컴포넌트의 props 타입
 */
interface ActionButtonsProps {
  onGoHome: () => void; // 홈으로 이동 버튼 클릭 핸들러
  onLogout: () => void; // 로그아웃 버튼 클릭 핸들러
}

/**
 * 액션 버튼 컴포넌트
 * 마이페이지에서 사용자가 수행할 수 있는 액션들을 버튼으로 제공
 *
 * @param onGoHome - 홈으로 이동 버튼 클릭 시 실행될 함수
 * @param onLogout - 로그아웃 버튼 클릭 시 실행될 함수
 */
export default function ActionButtons({
  onGoHome,
  onLogout,
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      {/* 홈으로 이동 버튼 */}
      <button
        onClick={onGoHome}
        className="flex-1 bg-[#2a2a2a] text-gray-300 py-3 rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors"
      >
        홈으로
      </button>

      {/* 로그아웃 버튼 (빨간색으로 강조) */}
      <button
        onClick={onLogout}
        className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}
