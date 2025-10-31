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
    <>
      <div className="bg-black text-white h-full">
        <h1 className="text-2xl font-bold p-5">내 정보</h1>
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <img className="rounded-full m-5 w-30 h-30 border-1" src={data?.data?.avatar as string} alt="" />
            <div className="flex flex-col justify-end my-5">
              <h1 className="text-xl font-bold">{data?.data?.name}</h1>
              <h2>{data?.data?.email}</h2>
            </div>
          </div>
          <button className="cursor-pointer px-3 py-2 text-md bg-[#323232] rounded-lg" onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </>
  )
}
