import { PlusIcon } from "lucide-react"
import { useModal } from "../context/ModalContext"

export const FloatingButton = () => {
  const {openAddLpModal} = useModal();
  return (
    <>
      <button className="flex flex-row justify-center items-center bg-[#FF1E9D] w-12 h-12 rounded-full text-white cursor-pointer aria-label" onClick={openAddLpModal}>
        <PlusIcon/>
      </button>
    </>
  )
}