import type { MouseEvent } from 'react';
import type { LinkProps } from '../types/LinkProps';
import { getCurrentPath } from '../utils/getCurrentPath';
import { navigateTo } from '../utils/navigateTo';

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (getCurrentPath() === to) return;
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};