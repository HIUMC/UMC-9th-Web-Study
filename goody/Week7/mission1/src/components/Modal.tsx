import { ReactNode, MouseEvent } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
    <div 
        onClick={onClose} 
        className="fixed top-11 left-0 w-[100%] h-[100%] background-[rgba(0, 0, 0, 0.5)] flex justify-center items-center"
        >
        <div 
            onClick={(e: MouseEvent) => e.stopPropagation()} 
            className="bg-white border-8 shadow-xs p-20 relative">
            <button 
                onClick={onClose} 
                className="">
                X
            </button>
            {children}
        </div>
    </div>
    );
};