import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { AddLpModal } from "./AddLpModal"
import { useModal } from "../context/ModalContext"

export const FloatingButton = () => {
  const {isAddLpModalOpen, openAddLpModal} = useModal();
  return (
    <>
      <button className="flex flex-row justify-center items-center bg-[#FF1E9D] w-12 h-12 rounded-full text-white cursor-pointer" onClick={openAddLpModal}>
        <div
          className=""
        />
        
        <PlusIcon/>
      </button>
    </>
  )
}