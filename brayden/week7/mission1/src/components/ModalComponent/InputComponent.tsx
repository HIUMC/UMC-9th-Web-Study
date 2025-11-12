interface inputPlaceHolderProps {
  inputComment?: string;
  value: string;
  onEnterPress?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
}

const InputComponent = ({
  inputComment,
  value,
  onChange,
  onEnterPress,
  classname,
}: inputPlaceHolderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress?.(); // 엔터가 눌리면 콜백 실행
    }
  };
  return (
    <>
      <input
        placeholder={inputComment}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`rounded-lg border-gray-200 border-1 p-1 
          text-white h-10 w-full outline-0 pl-2 ${classname}`}
      />
    </>
  );
};

export default InputComponent;
