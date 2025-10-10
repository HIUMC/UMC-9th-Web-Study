import { NavLink } from 'react-router-dom';

const LINKS = [
    { to: '/', label: '홈' },
    { to: '/movies/popular', label: '인기 영화' },
    { to: '/movies/now_playing', label: '상영 중' },
    { to: '/movies/top_rated', label: '평점 높은' },
    { to: '/movies/upcoming', label: '개봉 예정' }
];

export const Navbar = () => {
    return (
        // 페이지 최상단에 고정된 어두운 배경의 최상위 NavBar 구현
        <header className="bg-gray-900 sticky top-0 z-50">
            {/* NavBar의 메뉴 항목들을 높이 64px인 공간 안에 가로, 세로 모두 중앙 정렬 */}
            <nav className="flex items-center justify-center h-16"> 
                {/* 메뉴 항목들을 가로로 나란히 배열, 각 항목 사이에 일정한 간격 */}
                <div className="flex space-x-6">
                    {LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            // 공통 스타일 : 메뉴 항목을 둥글게 만들고, 스타일 변화 시 0.2초의 애니메이션 효과 적용
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                                ${isActive 
                                    ? 'bg-[#beb0ea] text-gray-900' // 현재 페이지 항목 : 밝은 배경과 어두운 글자
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white' // 이외 : 검정 배경에 맞는 기본 텍스트 색상, 마우스 올리면 색상 변화
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
};