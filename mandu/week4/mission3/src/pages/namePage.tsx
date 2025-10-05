import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NamePage = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLAreaElement>) => {
    setNickname(e.target.value);
  };

  const { email, password } = location.state;
  console.log(email, password);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80%] gap-4">
        <div className="flex justify-between w-[25%] text-xl font-bold p-4">
          <h1
            onClick={() => nav("/pw", { state: email })}
            className="font-bold cursor-pointer"
          >
            &lt;
          </h1>
          <h1>회원가입</h1>
          <h1 className="invisible">&gt;</h1>
        </div>
        <form className="flex flex-col gap-3 w-[25%]">
          <input
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요!"
            className="border rounded-md p-2"
            onChange={handleChange}
          />

          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-500"
            type="button"
            disabled={nickname === ""}
            onClick={() => nav("/")}
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </>
  );
};

export default NamePage;
