import { Outlet } from "react-router-dom";
import { Navbar } from "../components/NavBar";

const HomePage = () => {
  return (
  <div>
    <Navbar />
    <Outlet />
  </div>
  )
};

export default HomePage;