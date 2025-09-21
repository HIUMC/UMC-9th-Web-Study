import { useTheme } from "./context/ThemeProvider"
import clsx from 'clsx';

const ThemeToggleButton = () => {
  const {theme, toggleTheme} = useTheme(); //구조분해 할당

  const isLightMode = (theme === 'LIGHT');  
  // isLightMode에는 boolean이 담긴다
  
  return (
    <button onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
        'bg-black text-white': !isLightMode,
        'bg-white text-black': isLightMode,
      })}
    >
      {isLightMode? '🌙다크모드':'☀️라이트모드'}
    </button>
  )
}

export default ThemeToggleButton
