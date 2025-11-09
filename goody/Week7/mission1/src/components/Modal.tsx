import { type ReactNode, type MouseEvent } from 'react';
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 flex justify-center items-center"
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
    </>
    ,
    document.body
    );
};