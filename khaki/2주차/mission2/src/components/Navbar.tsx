import clsx from "clsx";
import { useTheme } from "./context/ThemeProvider"
import ThemeToggleButton from "./ThemeToggleButton";


const Navbar = () => {
  const {theme} = useTheme(); 
  const isLightMode = (theme === 'LIGHT');


  return (
    <nav
    className={clsx(
      'p-4 w-full flex justify-end',
      isLightMode? 'bg-white' : 'bg-gray-800 text-white'
    )}
    >
      <ThemeToggleButton/>
    </nav>
  )
}

export default Navbar
