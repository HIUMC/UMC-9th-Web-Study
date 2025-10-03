import type { LinkProps } from "./types";
import { type MouseEvent } from "react";

export const Link = ({to, children, navigateTo}: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>)  => {
    e.preventDefault();
    navigateTo(to);
  }
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}