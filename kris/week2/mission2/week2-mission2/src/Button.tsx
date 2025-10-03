import clsx from "clsx";
import type React from "react";

export const Button = ({children, className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all border cursor-pointer', className)}
    >
      {children}
    </button>
  )
}