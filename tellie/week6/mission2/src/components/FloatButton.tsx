import { useNavigate } from "react-router-dom";

const FloatButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="size-12 fixed bottom-10 right-10 bg-pink-600 text-white text-2xl rounded-full justify-center items-center cursor-pointer hover:bg-pink-700 transition-colors"
            onClick={() => navigate("/#")}
            aria-label={"플로팅 버튼"}
        >
            +
        </button>
    );
};

export default FloatButton;