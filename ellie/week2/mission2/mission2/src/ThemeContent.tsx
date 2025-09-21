import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
  const {theme} =useTheme();

  const isLightMode = theme ===THEME.LIGHT;  
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