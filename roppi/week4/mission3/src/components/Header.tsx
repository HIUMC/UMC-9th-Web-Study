import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-[#131313] h-[50px] flex justify-between p-[10px]">
      <Link to='/' className="flex items-center font-bold text-[#e52582] cursor-pointer">돌려돌려LP판</Link>
      <div className="flex gap-[10px] text-white">
        <Link to='/login' className="text-[8px] flex items-center rounded-sm bg-black my-[5px] px-[8px] cursor-pointer">로그인</Link>
        <Link to='signup' className="text-[8px] flex items-center rounded-sm my-[6px] px-[8px] bg-[#e52582] cursor-pointer">회원가입</Link>
      </div>
    </div>
  )
};
export default Header;