import { useTheme, THEME } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButtons() : Element {
const { theme, toggleTheme } = useTheme();

const isLightMode = theme == THEME.LIGHT;

return (
  <button className={clsx(`px-4 py-2 mt-4 rounded-md transition-all`, {
  'bg-black text-white' : !isLightMode,
  'bg-white text-black' : isLightMode,
}) } onClick={toggleTheme}>{isLightMode ? '🌙 다크모드' : '☀️ 라이트 모드'}</button>
)
} 
