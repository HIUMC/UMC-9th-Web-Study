import React from "react";
import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from 'clsx';
import { Button } from "./Button";

export default function ThemeToggleButton() {
  const {theme, toggleTheme} = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  return (
  <Button
    onClick={toggleTheme}
    className={clsx({
      'bg-black text-white': !isLightMode,
      'bg-white text-black': isLightMode,
    })}
  >
    {isLightMode ? '다크 모드' : '라이트 모드'}
  </Button>
  );
}