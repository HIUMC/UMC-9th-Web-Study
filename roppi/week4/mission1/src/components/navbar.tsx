import { NavLink } from 'react-router-dom';
const LINKS = [
  { to: '/', label: '홈'},
  { to: '/movies/popular', label: '무비차트' },
  { to: '/movies/now_playing', label: '현재상영작' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '상영예정' },
];

const Navbar = () => {
  return (
    <nav className='flex gap-3 p-4 mx-[200px]'>
      {LINKS.map(({ to, label }) =>(
   <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative cursor-pointer transition-all duration-300 text-black 
             after:content-[""] after:absolute after:left-1/2 after:bottom-[-3px]
             after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:-translate-x-1/2
             ${isActive ? 'font-bold after:w-full' : 'font-semibold'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;