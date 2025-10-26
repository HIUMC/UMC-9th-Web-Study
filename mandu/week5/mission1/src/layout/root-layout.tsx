import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-950 h-dvh text-white">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
