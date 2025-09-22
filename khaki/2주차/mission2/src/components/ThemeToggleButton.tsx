import { useTheme } from "./context/ThemeProvider"
import clsx from 'clsx';

const ThemeToggleButton = () => {
  const {theme, toggleTheme} = useTheme(); //구조분해 할당
  const isLightMode = (theme === 'LIGHT');  
  // isLightMode의 존재 이유:
  //    - theme자체를 이용해 조건식을 쓰면 길어지고 중복코드 발생
  //    - 따라서 미리 boolean값을 만들어 더 간편하게 사용
  //      이를 '불리언 플래그'라고 한다.
  
  return (
    <button onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
        'bg-black text-white': !isLightMode,
        'bg-white text-black': isLightMode,
      })}
    >
      {isLightMode? '🌙다크모드':'☀️라이트모드'}
      {/*lIGHT일때는 '다크모드' 버튼, DARK일때는 '라이트모드'버튼*/}
    </button>
  )
}

export default ThemeToggleButton
