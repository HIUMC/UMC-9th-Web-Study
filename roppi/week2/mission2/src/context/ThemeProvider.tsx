import { createContext, useContext, useState, type PropsWithChildren } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface ThemeContextType {
  theme : TTheme;
  toggleTheme: () => void

}

// type ThemeContext = {
//   toggleTheme: () => void
// }

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
 
export const ThemeProvider = ({children} : PropsWithChildren) : Element=> {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prev): THEME =>
    prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

    return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    )
}

export const useTheme = () : ThemeContextType => {
  const context = useContext(ThemeContext);

  if(!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context
}