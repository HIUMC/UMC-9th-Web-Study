// 조건부로 CSS 클래스를 합쳐주는 유틸 함수
import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

// ** 모드 전환 버튼
function ThemeToggleButton() {
  // 1) Context 값 가져오기
  const {theme, toggleTheme} = useTheme();

  // 2) 현재 모드 판별
  const isLightMode = theme === THEME.LIGHT;

  // 3) 렌더링
  //  - 버튼 클릭하면 toggleTheme() 실행
  //  - 버튼 텍스트 :isLightMode ? '🌚 다크모드' : '☀️ 라이트모드'
  return (
    <button 
      onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all', {
        'bg-black text-white':!isLightMode,
        'bg-white text-black': isLightMode,
      })}
      >
      {isLightMode? '🌚 다크모드' : '☀️ 라이트모드'}
    </button>
  )
}
export default ThemeToggleButton