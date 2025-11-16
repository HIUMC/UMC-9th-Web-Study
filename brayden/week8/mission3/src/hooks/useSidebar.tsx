import { useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // setIsOpen
  // 1. isOpen -> true : open
  // 2. isOpen -> false : close
  // 3. isOpen ? true : false : toggle

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
