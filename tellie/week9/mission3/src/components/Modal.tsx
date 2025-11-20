import { useModalStore, useCartActions } from '../hooks/useCartStore';

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const { clearCart } = useCartActions();

  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div 
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={handleClose}
      ></div>
      
      <div className='relative z-50 bg-white rounded-lg p-8 max-w-md w-full mx-4'>
        <h2 className='text-xl font-semibold mb-6 text-center'>
          정말 삭제하시겠습니까?
        </h2>
        
        <div className='flex justify-center space-x-4'>
          <button
            onClick={handleClose}
            className='px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;