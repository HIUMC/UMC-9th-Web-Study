interface ButtonGroupProps {
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const ButtonGroup = ({
  handleIncrement,
  handleDecrement,
}: ButtonGroupProps) => {
  return (
    <div>
      <button onClick={handleIncrement}>+1 증가</button>
      <button onClick={handleDecrement}>-1 감소</button>
    </div>
  );
};

export default ButtonGroup;