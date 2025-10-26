import { useEffect, useState } from 'react'
import { getMyInfo } from '../apis/auth';
import type { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(()=>{
    const getData = async()=>{
      const response = await getMyInfo();
      setData(response);
    };

    getData();
  },[]);

  const handleLogout = async()=>{
    await logout();
    navigate('/');
  };

  return (
    <div>
      <h1>{data?.data.name}님 환영합니다.</h1>
      <h1>{data?.data.email}</h1>
      <button 
      className="border px-4 py-2 bg-red-500 text-white rounded-md"
      onClick={handleLogout}>로그아웃</button>  
    </div>
  )
}

export default MyPage;
