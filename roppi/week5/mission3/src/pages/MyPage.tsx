import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { logout } = useAuth();
  const { accessToken } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logout();
    navigate('/')
  }


  return (
    <div className="flex flex-col justify-center items-center gap-10">
      {/* <h1 className="text-white">{data.data?.name}님 환영합니다.</h1> */}
      <h1 className="text-white">안녕</h1>
      <div>
      <button  
      className='cursor-pointer border border-white' 
      onClick={handleLogout}
      >로그아웃</button>
      </div>
    </div>
  );
};

export default MyPage;
