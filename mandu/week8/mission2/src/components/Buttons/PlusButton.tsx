interface PlusButtonProps {
  handlePlus: () => void;
  isOpen: boolean;
}

const PlusButton = ({ handlePlus, isOpen }: PlusButtonProps) => {
  return (
    <>
      <button
        onClick={handlePlus}
        disabled={isOpen}
        className="fixed cursor-pointer bottom-35 right-10 text-3xl w-16 h-16 flex items-center justify-center rounded-full font-bold bg-pink-500 disabled:cursor-not-allowed "
      >
        +
      </button>
    </>
  );
};

export default PlusButton;
