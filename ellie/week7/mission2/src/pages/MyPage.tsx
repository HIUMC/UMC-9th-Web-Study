import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import useGetMyInfo from "../hooks/useGetMyInfo";

export default function MyPage() {
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();
  const { data: myInfo } = useGetMyInfo(accessToken);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="relative mt-20 w-100 rounded-lg bg-gray-700 flex flex-col justify-center items-center">
        <div className="flex flex-row w-full justify-center relative">
          <h1 className="text-white mt-10 text-2xl font-bold">
            {myInfo?.data.name}
          </h1>
          <button
            onClick={() => navigate("edit")}
            className="text-white  absolute right-20 top-5 cursor-pointer"
          >
            <IoSettingsSharp size={20} />
          </button>
        </div>
        <img
          src={
            myInfo?.data.avatar
              ? myInfo?.data.avatar
              : "https://www.gravatar.com/avatar/?d=mp&s=200"
          }
          alt={"구글 로고"}
          className="rounded-full mt-5 size-30"
        />
        <p className="text-white mt-5 ">
          {myInfo?.data.bio ? myInfo?.data.bio : ""}
        </p>
        <p className="text-white mt-5 ">{myInfo?.data.email}</p>

        <button
          className="w-50 text-white font-bold bg-black border-white w-20 h-8 rounded-md cursor-pointer mt-5 mb-5"
          onClick={handleLogout}
        >
          로그아웃
        </button>
        <Outlet />
      </div>
    </div>
  );
}
