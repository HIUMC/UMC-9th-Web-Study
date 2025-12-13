import { memo } from "react";

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({onChange}: ITextInput) => {
  console.log("TextInput 렌더링됨");
  return (
    <input 
      type="text"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default memo(TextInput);

// 기존 방식 ( 컴포넌트가 렌더될 때마다 handleText 함수가 새로 생성됨 -> 참조동일성 X )
// const [text, setText] = useState<string>("");

// const handleText = (str : string) => {
//   setText(str);
// }