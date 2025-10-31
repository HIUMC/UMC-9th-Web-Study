import { useNavigate } from "react-router-dom"
import LoginHeader from "../components/LoginHeader";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <LoginHeader />
      <h2 className = 'text-3xl font-bold mb-4'>404 Not Found Error</h2>
      <p className = 'mb-8'>요청하신 페이지를 찾을 수 없습니다.</p>
      <div className = 'w-full flex justify-center'>
        <button
          type='button' 
          onClick={() => navigate('/')}
          className = "w-80 bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >홈화면으로 돌아가기</button>
      </div>
    </div>
  )
}

export default NotFoundPage;