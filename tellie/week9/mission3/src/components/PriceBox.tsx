import { useCartInfo, useModalStore } from '../hooks/useCartStore';

const PriceBox = () => {
    const { total } = useCartInfo();
    const openModal = useModalStore((state) => state.openModal);

    const handleInitializeCart = () => {
        openModal();
    };

    return (
        <div className='p-12 flex flex-col items-center justify-center space-y-4'>
            <button onClick={handleInitializeCart}
                className='border p-4 rounded-md cursor-pointer hover:bg-gray-100'
            >
                전체 삭제
            </button>
            <div>총 가격: {total}원</div>
        </div>
    );
};
export default PriceBox;