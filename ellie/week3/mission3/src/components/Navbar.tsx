import {NavLink } from "react-router-dom"
import { LINKS } from "../constants/LINKS"

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