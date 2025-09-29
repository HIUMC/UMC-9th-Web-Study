// router/Link.tsx

import type { MouseEvent } from 'react';
import { navigateTo } from '../utils/navigateTo';

export const Link = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // 기본 새로고침 동작 방지
        navigateTo(to);     // SPA 방식의 페이지 이동 처리
    };

    return (
        <a href={to} onClick={handleClick}>
        {children}
        </a>
    );
};