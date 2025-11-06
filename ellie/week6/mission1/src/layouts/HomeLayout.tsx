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
      <button
        onClick={() => navigate("#")}
        className="text-2xl flex justify-center items-center cursor-pointer fixed bottom-6 right-6 bg-blue-600 text-white size-14 rounded-full"
      >
        <span className="mb-1">+</span>
      </button>
    </div>
  );
}

export default HomeLayout;
