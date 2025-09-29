// src/components/navbar.tsx
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-green-200 font-bold" // 활성화 상태일 때 적용할 스타일
      : "text-black font-bold"; // 비활성화 상태일 때 적용할 스타일
  };

  return (
    <nav className="flex flex-row gap-4 p-4">
      <NavLink to="/" className={getLinkClass}>홈</NavLink>
      <NavLink to="/movies" className={getLinkClass}>인기 영화</NavLink>
      <NavLink to="/now_playing" className={getLinkClass}>상영 중</NavLink>
      <NavLink to="/top_rated" className={getLinkClass}>평점 높은</NavLink>
      <NavLink to="/up_coming" className={getLinkClass}>개봉 예정</NavLink>
    </nav>
  );
};

export default Navbar;