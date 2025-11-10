import { IoMdClose } from "react-icons/io";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="relative w-120 h-80 bg-black border-2 border-white rounded-lg flex flex-col gap-15 justify-center items-center">
        <button className="absolute top-3 right-5">
          <IoMdClose color="white" size={20} />
        </button>
        <p className="text-white text-xl font-semibold">{message}</p>
        <div className="flex flex-row w-full gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="text-white bg-blue-700 w-20 h-8 rounded-md cursor-pointer"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="text-white border-white border-2 w-20 h-8 rounded-md cursor-pointer"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
