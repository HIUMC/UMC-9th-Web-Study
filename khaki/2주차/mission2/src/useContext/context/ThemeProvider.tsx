import { createContext, useContext, useState, type PropsWithChildren } from "react";


// enum을 타입으로 쓰면, 들어올 수 있는 값(상수)의 집합을 미리 한정하는 것

type TTheme = 'LIGHT' | 'DARK';

interface IThemeContext{
  theme:TTheme; // 테마상태
  toggleTheme:()=>void; // 테마변경 
}



export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}:PropsWithChildren)=>{
  const [theme,setTheme] = useState<TTheme>('LIGHT');
  
  const toggleTheme = () :void => {
    setTheme((prevTheme) : TTheme => 
      prevTheme === 'LIGHT' ? 'DARK' : 'LIGHT')
  }

  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )

};

export const useTheme = () : IThemeContext => {
  const context = useContext(ThemeContext);

  if(!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context
}