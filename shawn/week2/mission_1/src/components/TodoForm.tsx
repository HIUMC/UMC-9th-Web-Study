import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue(""); // 입력창 초기화
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form__input"
        type="text"
        placeholder="할 일 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button className="todo-form__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
}
