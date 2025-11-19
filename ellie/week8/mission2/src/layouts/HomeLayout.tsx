import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomeLayout() {
  const navigate = useNavigate();
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
