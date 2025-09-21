import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

// ** 본문 콘텐츠 영역
export default function ThemeContent() {
  // 1) Context 값 가져오기
  const {theme} =useTheme();

  // 2) 현재 테마가 라이트 모드인지 여부
  const isLightMode = theme ===THEME.LIGHT;  

  // 3) 렌더링
  return <div className={clsx(
    'p-4 h-dvh', isLightMode ? 'bg-white' : 'bg-black'
  )}>
    <h1 className={clsx(
       'text-wxl font-bold',
       isLightMode ? 'text-black' : 'text-white'
    )}>
      Theme Content
    </h1>
    <p className={clsx(
      'mt-2', isLightMode ? 'text-black' : 'text-white'
    )}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium excepturi numquam facilis quod necessitatibus laboriosam molestias sit molestiae eveniet vitae, repellendus, alias cupiditate vel rem rerum dolorum nemo quas iusto!
    </p>
  </div>
}