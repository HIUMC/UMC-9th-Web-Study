import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  // useNavigate 훅을 호출하여 navigate 함수를 가져옵니다.
    const navigate = useNavigate();

  // 버튼 클릭 시 실행될 핸들러 함수
    const handleGoBack = () => {
    // navigate(-1)은 브라우저의 history에서 한 단계 뒤로 이동하라는 의미입니다.
    navigate(-1);
    };
    return (
        <button
            onClick={handleGoBack}
            className="text-2xl px-2 py-1 font-semibold text-[#4f4e6c]"
        >
        {"<"}
        </button>
    );
}