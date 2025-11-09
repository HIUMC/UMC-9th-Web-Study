/**
 * ========================================
 * 닉네임 입력 페이지 (NamePage)
 * ========================================
 *
 * 회원가입 과정의 마지막 단계 페이지입니다.
 * 이메일과 비밀번호는 이전 페이지에서 입력받았고,
 * 이 페이지에서 닉네임을 입력받아 회원가입을 완료합니다.
 *
 * 주요 기능:
 * 1. 닉네임 입력 폼
 * 2. 이전 페이지에서 전달받은 이메일, 비밀번호와 함께 회원가입 요청
 * 3. 회원가입 완료 후 홈페이지로 이동
 * 4. 이전 페이지로 돌아가기 버튼
 */

import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

/**
 * 닉네임 입력 페이지 컴포넌트
 * 회원가입의 마지막 단계
 */
const NamePage = () => {
  // 라우터 네비게이션 함수
  const nav = useNavigate();

  // 이전 페이지에서 전달받은 state (email, password)
  const location = useLocation();

  // 닉네임 입력 상태
  const [nickname, setNickname] = useState("");

  /**
   * 닉네임 입력 변경 핸들러
   * @param e - 입력 이벤트
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLAreaElement>) => {
    setNickname((e.target as HTMLInputElement).value);
  };

  // 이전 페이지에서 전달받은 이메일과 비밀번호
  const { email, password } = location.state;
  console.log(email, password);

  /**
   * 회원가입 완료 버튼 클릭 핸들러
   * 닉네임, 이메일, 비밀번호를 서버에 전송하여 회원가입 완료
   */
  const handleClick = async () => {
    // 회원가입 데이터 구성
    const data = { name: nickname, email, password };

    // 회원가입 API 호출
    const response = await postSignup(data);
    console.log(response);

    // 회원가입 성공 시 홈페이지로 이동
    nav("/");
  };
  // JSX 렌더링
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80%] gap-4">
        {/* 헤더: 뒤로가기 버튼, 제목 */}
        <div className="flex justify-between w-[25%] text-xl font-bold p-4">
          {/* 뒤로가기 버튼: 비밀번호 입력 페이지로 이동 */}
          <h1
            onClick={() => nav("/pw", { state: email })}
            className="font-bold cursor-pointer"
          >
            &lt;
          </h1>

          {/* 페이지 제목 */}
          <h1>회원가입</h1>

          {/* 레이아웃 균형을 위한 보이지 않는 요소 */}
          <h1 className="invisible">&gt;</h1>
        </div>

        {/* 닉네임 입력 폼 */}
        <form className="flex flex-col gap-3 w-[25%]">
          {/* 닉네임 입력 필드 */}
          <input
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요!"
            className="border rounded-md p-2"
            onChange={handleChange}
          />

          {/* 회원가입 완료 버튼 (닉네임 미입력 시 비활성화) */}
          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-500"
            type="button"
            disabled={nickname === ""}
            onClick={handleClick}
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </>
  );
};

export default NamePage;
