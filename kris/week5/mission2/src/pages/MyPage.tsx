import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response)
    }
    getData();
  }, [])
  
  const handleLogout = async () => {
    await logout()
    navigate("/");
  }

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <img src={data?.data?.avatar as string} alt="구글 로고" />
      <h2>{data?.data?.email}</h2>

      <button className="cursor-pointer bg-blue-300 rounded-sm p-3 hover:scale-90" onClick={handleLogout}>로그아웃</button>
    </div>
  )
}
