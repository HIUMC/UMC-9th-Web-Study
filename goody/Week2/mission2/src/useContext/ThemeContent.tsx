import clsx from "clsx"
import { THEME, useTheme } from "../context/ThemeProvider"

export default function ThemeContent() {
  const {theme} = useTheme()
    
  const isLightMode = theme == THEME.LIGHT
  return (
    <div className={clsx(
      'p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
      <h1 className={clsx(
        'text-wxl font-bold', isLightMode ? 'text-black': 'text-white'
      )}>
        Theme Content
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, vel! Doloremque a nihil repudiandae? Voluptates id provident accusantium delectus. Fuga corporis aut, molestiae atque quam quaerat quis eaque neque voluptatum.
      </p>
    </div>
  )
}
 