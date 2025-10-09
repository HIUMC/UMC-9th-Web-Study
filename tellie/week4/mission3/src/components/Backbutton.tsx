import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
    const navigate = useNavigate();

    return (
        <button 
            className={`text-2xl text-gray-400 hover:text-white transition-colors ${className}`}
            onClick={() => navigate(-1)} // 이전 페이지로 이동
            aria-label="뒤로 가기"
        >
            {'<'}
        </button>
    );
};

export default BackButton;