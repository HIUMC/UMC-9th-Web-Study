import { createContext, useContext, useState, type PropsWithChildren } from "react";

// TTheme의 타입 정의(TTheme에는 'LIGHT'나 'DARK'만 들어올 수 있음)
type TTheme = 'LIGHT' | 'DARK';

// context의 타입 정의
interface IThemeContext{
  theme:TTheme; // 테마상태
  toggleTheme:()=>void; // 테마변경 함수
}

// context 생성
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// ThemeProvider 컴포넌트 정의
/* 역할 : 전역 store + 배급소
    - theme상태를 실제 소유하는 주체,
    - themeContext.Provider로 감싸서 모든 하위 컴포넌트에 상태와 함수를 뿌려줌
    - 안전장치 역할도 함
*/
export const ThemeProvider = ({children}:PropsWithChildren)=>{
  // 컴포넌트 내부에선 상태와 조작함수를 정의
  const [theme,setTheme] = useState<TTheme>('LIGHT');
  const toggleTheme = () :void => {
    setTheme((prevTheme) : TTheme => 
      prevTheme === 'LIGHT' ? 'DARK' : 'LIGHT')
  }

  // return값에서 .provider를 사용해 value prop으로 그 상태와 함수를 브로드캐스트(return문은 거의 형식이 고정되어 있다)
  return(
    <ThemeContext.Provider value={{theme, toggleTheme}  
    /*provider가 value를 제공*/}>
      {children}
    </ThemeContext.Provider>
  )

};

export const useTheme = () : IThemeContext => {
  const context = useContext(ThemeContext); 
  // 위에서 제공한 value를 사용
  if(!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context
}