import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/basicLayout/Navbar";
import Footer from "../components/basicLayout/Footer";
import FloatingButton from "../components/FloatingButton";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <div className="h-dvh flex flex-col ">
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <FloatingButton />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
// Outlet은 Context와 비슷한 느낌
