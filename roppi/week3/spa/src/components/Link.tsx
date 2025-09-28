import type { MouseEvent } from 'react';
import { getCurrentPath, navigateTo } from '../utils';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => { //MouseEvent<HTMLAnchorElement>는 <a> 태그에서 발생한 마우스 이벤트라는 의미
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

