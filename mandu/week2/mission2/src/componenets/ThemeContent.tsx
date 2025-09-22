import clsx from 'clsx';
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent(){
    const {theme, toggleTheme} = useTheme();
        
    const isLightmode = theme === THEME.LIGHT;
    return <div className={clsx(
        'p-4 h-dvh w-full',
        isLightmode ? 'bg-white text-black':'bg-gray-800 text-white'
    )}>ThemeContent</div>
}