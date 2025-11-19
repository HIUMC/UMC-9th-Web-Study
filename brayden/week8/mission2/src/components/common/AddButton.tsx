interface AddButtonProps {
  onClick: () => void;
  buttonText: string;
}

const AddButton = ({ onClick, buttonText }: AddButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className="rounded-lg cursor-pointer py-2 bg-gray-400 px-4 text-white font-medium"
      >
        <span className="text">{buttonText}</span>
      </button>
    </>
  );
};

export default AddButton;
