import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const FloatingButton = () => {
  return (
    <>
    <Link to="#" className="flex flex-row justify-center items-center bg-[#FF1E9D] w-12 h-12 rounded-full text-white">
      <PlusIcon/>
    </Link>
    </>
  )
}