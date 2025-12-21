interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링됨");

  return (
    <input type="text" className="mt-5 border-3 p-4 rounded-lg" onChange={(e): void => onChange(e.target.value)} />
  );
};

export default TextInput;
