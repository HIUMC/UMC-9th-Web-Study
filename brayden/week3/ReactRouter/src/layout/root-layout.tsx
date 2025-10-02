// '/'로 시작하는 모든 경로에서 공유되는 레이아웃
// navbar는 고정으로 유지하고, 아래 컨텐츠 영역만 라우트에 따라 변경
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
