import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface ModalContextType {
  isAddLpModalOpen: boolean;
  openAddLpModal: () => void;
  closeAddLpModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [isAddLpModalOpen, setIsAddLpModalOpen] = useState(false);

  const openAddLpModal = () => setIsAddLpModalOpen(true);
  const closeAddLpModal = () => setIsAddLpModalOpen(false);

  return (
    <ModalContext.Provider value={{isAddLpModalOpen, openAddLpModal, closeAddLpModal}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if(!context) {
    throw new Error("useModal must be used within ModalProvider")
  }
  return context;
}