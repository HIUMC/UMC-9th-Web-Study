import { Link, NavLink } from "react-router-dom";


const NavBar = () => {
  const LINKS = [
    {to: '/', label:'홈'},
    {to: '/login', label:'로그인'},
    {to: '/signup', label:'회원가입'},
    {to: '/my', label:'마이페이지'},
];

  return (
    <div className='p-4 flex justify-between items-center'>
      <Link
        to="/"
        className="text-[#b2dab1] text-3xl font-bold">돌려돌려LP판
      </Link>
      {LINKS.map(({to, label}) => 
          <NavLink
            key={to}
            to={to}
            className={ ({isActive}) => 
              isActive? 'text-[#b2dab1] font-bold' : 'text-gray-500'
            }
          >
          {label}
          </NavLink>
        )}
    </div>
  )
}

export default NavBar
