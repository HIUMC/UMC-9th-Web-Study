interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링됨");
  return (
    <input
      className="border p-2"
      type="text"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default TextInput;
