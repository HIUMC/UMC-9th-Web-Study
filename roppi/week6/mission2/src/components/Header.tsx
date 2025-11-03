import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import searchIcon from "../assets/searchIcon.png";
import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import hamburger from "../assets/hamburger.png";

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { logout, accessToken } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();


  const handleLogout = async () => {
    await logout();
    navigate('/')
  }


  useEffect(() => {
    if (!accessToken) {
      console.log("토근없은");
      return; // 토큰 없으면 요청하지 않음
    }

    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full bg-[#131313] h-[50px] flex justify-between p-[10px]">
      <div className="flex gap-3">
        <img src={hamburger} className="w-[20px] cursor-pointer"
          onClick={onToggleSidebar}
        />
        <Link to='/' className="flex items-center font-bold text-[#e52582] cursor-pointer">돌려돌려LP판</Link>
      </div>
        { !accessToken &&
        <div className="flex gap-[10px] text-white">
          <Link to='/login' className="text-[8px] flex items-center rounded-sm bg-black my-[5px] px-[8px] cursor-pointer">로그인</Link>
          <Link to='signup' className="text-[8px] flex items-center rounded-sm my-[6px] px-[8px] bg-[#e52582] cursor-pointer">회원가입</Link>
        </div>
        }
        { accessToken &&
        <div className="flex gap-[10px] text-white items-center text-[10px]">
          <Link to={"search"} > <img src={searchIcon} className="w-[15px]"/> </Link>
          <p>{data?.data?.name}님 반갑습니다</p>
          <button 
          className="flex items-center rounded-sm bg-black my-[5px] px-[8px] cursor-pointer"
          onClick={handleLogout}
          >로그아웃</button>
        </div>
        }
    </div>
  )
};
export default Header;