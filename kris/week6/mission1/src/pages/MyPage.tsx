import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response)
    }
    getData();
  }, [])
  
  

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
        </div>
      </div>
    </>
  )
}
