import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatButton from "../components/FloatButton";
import { ModalProvider, useModal } from "../context/ModalContext";
import AddLpModal from "../components/AddLpModal";

const ProtectedLayoutContent = () => {
    const { openAddLpModal, isAddLpModalOpen, closeAddLpModal } = useModal();

    return (
        <div className='h-dvh flex flex-col'>
            <Navbar />
            <main className="flex-1 mt-10">
                <Outlet />
            </main>
            <Footer />
            <FloatButton onClick={openAddLpModal} />
            <AddLpModal
                isOpen={isAddLpModalOpen}
                onClose={closeAddLpModal}
            />
        </div>
    );
};

const ProtectedLayout = () => {
    const {accessToken} = useAuth();

    if(!accessToken) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <ModalProvider>
            <ProtectedLayoutContent />
        </ModalProvider>
    );
};

export default ProtectedLayout;