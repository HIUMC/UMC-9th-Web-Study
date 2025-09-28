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
            // 브라우저 전체를 새로고침하지 않고 주소창의 url만 바꿔주는 역할을 한다.
            className={ ({isActive}) => 
              isActive? 'text-[#b2dab1] font-bold' : 'text-gray-500'
            }
          >
          {label}
          </NavLink>
        ))
      }
    </div>
  )
}

export default NavBar

/*
<흐름>
1. 사용자가 NavLink 클릭
2. a태그의 기본동작을 막고 history.pushState()를 호출
3. 주소창은 /movies/popular로 바뀌지만, 페이지 리로드는 없음
4. React Router가 URL 변화를 감지 → 라우터 설정과 매칭
  /movies/:category → <MoviePage/> 렌더
5. <HomePage/>는 그대로 유지 → 그 안의 <Outlet/>만 교체됨

<NavLink의 두가지 기능>
1. URL 변경 (pushState)
2. 현재 경로와 매칭 여부에 따른 스타일 적용 (isActive)
*/
