import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";
import Menu from "./Menu";

export default function ThemeContent () {
    const {theme, toggleTheme} = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    return <div className={clsx('p-4 h-dvh', isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
        <h1 className={clsx(
            'text-wxl font-bold',
            isLightMode ? 'text-black' : 'text-white'
        )}>Theme Content</h1>
        <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')queueMicrotask}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nisi assumenda esse repellat asperiores sed, minima molestias perspiciatis soluta quaerat id quae, eaque iusto quia qui perferendis eveniet neque ratione.</p></div>
}