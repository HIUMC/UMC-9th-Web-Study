import { useState } from "react"

export const useSidebar = () => {
    const [isOpen,setIsOpen] = useState(false);

    //setIsOpen
    // -> isOpen = true => open
    // -> isOpen = false => close
    // -> isOpen === true ? open : close => toggle

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    return {isOpen, toggle,open,close};
}