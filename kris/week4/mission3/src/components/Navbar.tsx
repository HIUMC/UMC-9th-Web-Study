import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-[#323232] h-[60px]">
      <h1 className="font-bold text-[#FF1E9D] ml-5 text-xl cursor-pointer" onClick={() => navigate('/')}>돌려돌려LP판</h1>
      <div className="flex items-center gap-2 mr-2">
        <button className="bg-black text-white text-sm font-medium rounded-sm px-4 py-1 cursor-pointer" onClick={() => navigate('/login')}>로그인</button>
        <button className="bg-[#FF1E9D] text-white text-sm font-medium rounded-sm px-4 py-1 cursor-pointer" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  )
}

export default Navbar;