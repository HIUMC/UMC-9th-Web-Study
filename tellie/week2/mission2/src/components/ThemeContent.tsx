import clsx from 'clsx';
import { THEME,useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
    const {theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}>
            <h1 className={clsx('text-2xl font-bold', isLightMode ? 'text-black' : 'text-white')}>웹 프론트엔드 핵심 기술</h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                1. HTML: 웹 페이지의 뼈대를 만드는 마크업 언어 (구조)
                2. CSS: 웹 페이지의 모양과 스타일을 꾸미는 언어 (디자인)
                3. JavaScript: 웹 페이지에 동작과 인터랙션을 넣는 프로그래밍 언어 (동적 기능 담당)
                4. TypeScript: JavaScript에 타입을 추가한 상위 언어로, 더 안전하고 체계적인 개발을 돕는 언어
                5. React: JavaScript/TypeScript로 작성된 UI 라이브러리로, 컴포넌트를 기반으로 사용자 인터페이스를 효율적으로 구축.
            </p>    
        </div>
    );
}