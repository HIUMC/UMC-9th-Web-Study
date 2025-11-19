import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import hamburgerLogo from "../assets/hamburger-button.svg";
import { Search, X } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useState } from "react";
import { SearchDropdown } from "./SearchDropdown";
import useDebounce from "../hooks/useDebounce";

const Navbar = ({onToggleSidebar}) => {
  const navigate = useNavigate();
  const {accessToken, logout} = useAuth();
  const {data: myInfo } = useGetMyInfo(accessToken);

  const handleLogout = async () => {
    await logout()
    navigate("/");
  }
 
  return (
    <div className="flex items-center justify-between bg-[#1d1d1d] h-[60px] relative shadow-lg">
      <div className="flex flex-row items-center">
        <button className="md:hidden" onClick={onToggleSidebar}>
          <img className="scale-90 cursor-pointer ml-2" src={hamburgerLogo} alt=""/>
        </button>
        <Link to="/" className="font-bold text-[#FF1E9D] ml-5 text-xl cursor-pointer">돌려돌려LP판</Link>
      </div>
      
      <div className="flex items-center space-x-6 mr-2 text-white">
        {accessToken && <>
        <p>{myInfo?.data.name}님 반갑습니다.</p>
        <button className="bg-black text-white text-sm font-medium rounded-sm px-4 py-1 mr-3 cursor-pointer" onClick={handleLogout}>로그아웃</button>
        </>}
        {!accessToken && <>
        <Link to="/login" className="bg-black text-white text-sm font-medium rounded-sm px-4 py-1 cursor-pointer">로그인</Link>
        <Link to="/signup" className="bg-[#FF1E9D] text-white text-sm font-medium rounded-sm px-4 py-1 mr-3 cursor-pointer" onClick={() => navigate('/signup')}>회원가입</Link>
        </>}
      </div>
    </div>
  )
}

export default Navbar;