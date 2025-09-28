import { NavLink } from 'react-router-dom'

const LINKS = [
  {to: '/', label:'홈'},
  {to: '/movies/popular', label:'인기 영화'},
  {to: '/movies/now_playing', label:'상영 중'},
  {to: '/movies/top_rated', label:'평점 높은'},
  {to: '/movies/upcoming', label:'개봉 예정'}, 
];

const NavBar = () => {
  return (
    <div className='flex gap-3 p-4'>
      {LINKS.map(({to, label}) => 
        (
          <NavLink
            key={to}
            to={to}
            className={ ({isActive}) => 
              isActive? 'text-[#b2dab1] font-bold' : 'text-gray-500'
            }
          >
          {label}
          </NavLink>
        ))
      }
    </div>
    // Link누름 -> history.pushState로 주소를 /movies/popular로 바꿈 -> 그 시점에 react-router-dom이 현재 경로와 라우터 설정을 매칭
  )
}

export default NavBar
