import { type ReactNode } from 'react';
import ReactDOM from "react-dom"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return ReactDOM.createPortal( // 어디서 구현하든 화면 중앙에 오도록 하기 위한 Portal
        <>
        <div
        className="fixed inset-0 bg-opacity-50 z-50"
        onClick={onClose}
        />
        <div 
        onClick={onClose} 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col justify-center items-center"
        >
            <button 
                onClick={onClose} 
                className="ml-auto text-2xl cursor-pointer">
                X
            </button>
            {children}
        </div>
    </>
    ,
    document.body
    );
};