import {NavLink } from "react-router-dom"
import { LINKS } from "../constants/LINKS"

// 메뉴 데이터 배열 : 네비게이션 항목을 객체 배열로
//  - to : 이동할 경로(URL)
//  - label : 화면에 표시될 텍스트
// const LINKS = [
//   { to: '/', label: '홈'},
//   { to: '/movies/popular', label: '인기 영화'},
//   { to: '/movies/now_playing', label: '상영중'},
//   { to: '/movies/top_rated', label: '평점 높은'},
//   { to: '/movies/upcoming', label: '개봉 예정'},
// ]

export const Navbar = () => {
  // LINKS.map(...) : 배열을 순회하면서 NavLink생성
  //  - NavLink? : 내비게이션 메뉴에서 활성화된 링크를 표시할 때 사용
  //  - isActive === true : 현재 경로와 일치 
  //  - isActive === false : 기본
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({to, label}) => (
        <NavLink
          key={to}
          to={to}
          className={({isActive}) => {
            return isActive ? "text-[#b2dab1] font-bold" : "text-gray-500"
          }}
        >
          {label}
        </NavLink>
      ))}  
    </div>
  )
}