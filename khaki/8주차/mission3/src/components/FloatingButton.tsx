interface FloatingButtonProps {
  onOpen: () => void;
}

const FloatingButton = ({ onOpen }: FloatingButtonProps) => {
  return (
    <button
      onClick={onOpen}
      className="w-14 h-14 bg-pink-400 hover:bg-pink-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
    >
      <span className="text-white text-4xl font-bold leading-none translate-y-[-2px]">+</span>
    </button>
  );
};

export default FloatingButton;
