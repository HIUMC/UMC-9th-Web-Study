import { THEME, useTheme } from "./ThemeProvider"
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button 
        onClick={toggleTheme}
        className={clsx('px-4 py-2 font-bold mt-4 rounded-md transition-all duration-300 cursor-pointer', {
            'bg-black text-white' : !isLightMode,
            'bg-white text-black': isLightMode,
        })}
    >
        {isLightMode ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}
    </button>
  )
}

// npm i clsx