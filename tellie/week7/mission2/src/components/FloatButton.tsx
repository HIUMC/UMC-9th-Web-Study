type FloatButtonProps = {
    onClick: () => void;
};

const FloatButton = ({ onClick }: FloatButtonProps) => {
    return (
        <button
            className="size-12 fixed bottom-10 right-10 bg-pink-600 text-white text-2xl rounded-full justify-center items-center cursor-pointer hover:bg-pink-700 transition-colors"
            onClick={onClick}
            aria-label={"플로팅 버튼"}
        >
            +
        </button>
    );
};

export default FloatButton;