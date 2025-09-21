import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  // useEffect,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // // darkMode 값이 바뀔 때마다 <html> 태그 classList 업데이트
  // useEffect(() => {
  //   const root = document.documentElement; // <html>
  //   if (darkMode) {
  //     root.classList.add("dark");
  //   } else {
  //     root.classList.remove("dark");
  //   }
  // }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
