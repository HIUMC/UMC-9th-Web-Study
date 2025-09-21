// 상태 전역 관리

import { createContext, useContext, useState, type PropsWithChildren } from "react";

// ** THEME 상수 : LIGHT|DARK 두가지 모드 정의
export const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
} as const;

// TTheme은 "LIGHT","DARK"만 가능
export type TTheme = typeof THEME[keyof typeof THEME]; // enum이 안돼요..ㅜㅜ

// ** Context에서 다룰 값 정의
interface IThemeContext {
  // 현재 테마 상태
  theme: TTheme;
  // 테마를 반전시키는 함수
  toggleTheme: () => void;
}

// ** Context 생성
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// ** Provider 컴포넌트
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  // 1) theme 상태 관리 , LIGHT로 초기화
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  // 2) 테마 반전 함수
  // : 이전 상태가 LIGHT라면 DARK로, 아니라면 LIGHT
  const toggleTheme = () => {
    setTheme((prevTheme): TTheme =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  // 3) ThemeContext.Provider로 감싸기
  // : 자식 컴포넌트 (children)에 theme, toggleTheme 공급
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ** 커스텀 훅 useTheme
// const { theme, toggleTheme } = useTheme(); 하면 어디서든 전역 상태 사용ㅇ
export const useTheme = () : IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
