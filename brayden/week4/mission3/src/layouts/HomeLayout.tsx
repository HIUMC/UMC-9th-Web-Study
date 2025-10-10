import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col ">
      <nav className="flex items-center bg-gray-800 text-pink-500 p-4 font-bold text-xl">
        <span>돌려돌려LP판</span>
        <div className="ml-auto">
          <Link
            to={"/login"}
            className="text-xs ml-4 bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          >
            로그인
          </Link>
          <Link
            to={"/signup"}
            className="text-xs ml-4 bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          >
            회원가입
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default HomeLayout;
