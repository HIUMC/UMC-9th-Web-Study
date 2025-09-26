import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider"
import ThemeToggleButton from "./ThemeToggleButton";

// ** 상단 네비게이션 바
export default function Navbar() {
  // 1) Context 값 가져오기
  const {theme} =useTheme();

  // 2) 현재 테마가 라이트 모드인지 여부
  const isLightMode = theme ===THEME.LIGHT;

  // 3) 렌더링 , ThemeToggleButton 컴포넌트 넣어줌
  return (
    <nav className={clsx(
      'p-4 w-full flex justify-end',
      isLightMode ? 'bg-white' : 'bg-black'
    )}>
      <ThemeToggleButton />
    </nav>
  );
}