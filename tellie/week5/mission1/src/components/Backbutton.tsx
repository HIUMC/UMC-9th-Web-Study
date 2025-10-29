import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    className?: string;
    onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '', onClick }) => {
    const navigate = useNavigate();

    return (
        <button 
            type='button'
            className={`text-2xl text-gray-400 hover:text-white transition-colors ${className}`}
            onClick={onClick || (() => navigate(-1))} // onClick이 전달되면 함수 실행, 없으면 navigate(-1) 실행하기
            aria-label="뒤로 가기"
        >
            {'<'}
        </button>
    );
};

export default BackButton;