import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-6xl p-10">🌸환영합니다🌸</h1>
      <div className="text-lg w-60 text-center">
        <button className="text-gray-400 font-bold w-20 hover:cursor-pointer"
          onClick = {() => navigate("/login")}
        >
          로그인
        </button>
        <span className="text-gray-400 font-bold">{"/"}</span>
        <button className="text-gray-400 font-bold w-23 hover:cursor-pointer"
          onClick = {() => navigate("/signup")}
        >
          회원가입
        </button>      
      </div>      
    </div>
  )
}

export default HomePage
