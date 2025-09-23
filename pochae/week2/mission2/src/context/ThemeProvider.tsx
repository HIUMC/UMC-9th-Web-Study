import { createContext, useContext, useState, type PropsWithChildren } from "react";

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK',  
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme; // 현재 테마 값
    toggleTheme: () => void; // 테마를 토글하는 함수
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

    return ( // 이 Provider로 감싸진 모든 컴포넌트들이 값 공유할 수 있음.
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children} 
      </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used whithin a ThemeProvider');
    }
    return context;
}