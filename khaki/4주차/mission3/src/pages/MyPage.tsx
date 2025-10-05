import { useEffect } from 'react'
import { getMyInfo } from '../apis/auth';

const MyPage = () => {
  useEffect(()=>{
    const getData = async()=>{
      const response = await getMyInfo();
      console.log(response);
    };

    getData();
  }

  ,[]);



  return (
    <div>
      마이페이지
    </div>
  )
}

export default MyPage
