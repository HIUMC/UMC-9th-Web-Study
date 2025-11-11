import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatButton from "../components/FloatButton"
import { useState } from "react"
import LoginModal from "../components/LoginModal"
import AddLpModal from "../components/AddLpModal"
import { useAuth } from "../context/AuthContext"

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddLpModalOpen, setIsAddLpModalOpen] = useState(false);

  const handleFloatButtonClick = () => {
    if (isAuthenticated) {
      setIsAddLpModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginConfirm = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  return (
    <div className = 'h-dvh flex flex-col'>
        <Navbar />
        <main className="flex-1 mt-10">
            <Outlet />
        </main>
        <Footer />
        <FloatButton onClick={handleFloatButtonClick} />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onConfirm={handleLoginConfirm}
        />
        <AddLpModal
          isOpen={isAddLpModalOpen}
          onClose={() => setIsAddLpModalOpen(false)}
        />
    </div>
  )
}

export default HomeLayout
