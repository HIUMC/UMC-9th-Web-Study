import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { openModal } from '../features/modal/modalSlice';

const PriceBox = () => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleInitializeCart = () => {
        dispatch(openModal());
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