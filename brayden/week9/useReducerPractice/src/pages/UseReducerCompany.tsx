// Supp. 프론트 개발자 -> 카드메이커가 되고 싶다.
// 카드메이커가 아닌 다른 직업을 받았을 때는 에러 메시지 띄우기
// payload 값을 받아서 input으로 보여주는 예제

import { useReducer, useState, type ChangeEvent } from "react";

type TActionType = "CHANGE_DEPARTMENT" | "RESET";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: TActionType;
  payload?: string;
}

function reducer(state: IState, action: IAction) {
  {
    const { type, payload } = action;

    switch (type) {
      case "CHANGE_DEPARTMENT": {
        const newDepartment = payload;
        const hasError = newDepartment !== "카드메이커";
        console.log("hasError : ", hasError);
        console.log("department : ", newDepartment);
        return {
          ...state,
          department: hasError ? state.department : newDepartment,
          error: hasError
            ? "거부권 행사 가능, 카드메이커만 입력 가능합니다."
            : null,
        };
      }
      default:
        return state;
    }
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: "Software Developer",
    error: null,
  });

  const [department, setDepartment] = useState("");

  // 상태 1개일때는 괜찮지만 상태가 여러개의 조건들이 얽힐 경우 굉장히 복잡해지는 경우가 있음
  // 이때 reducer를 사용하면 편리함.
  //   const [error, setError] = useState<string | null>(null);

  //   const changeDepartment = () => {
  //     if (department !== "카드메이커") {
  //       setError("거부권 행사가능");
  //     } else {
  //       setDepartment(department);
  //       setError(null);
  //     }
  //   };

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1>{state.department}</h1>
      {state.error && <p className="text-red-500 text-2xl">{state.error}</p>}

      <input
        className="w-[600px] border mt-10 p-4 rounded-md"
        value={department}
        onChange={handleChangeDepartment}
        placeholder="변경하고 싶으신 직무를 입력해주세요. 단 거부권 행사 가능"
      />
      <button
        onClick={() =>
          dispatch({ type: "CHANGE_DEPARTMENT", payload: department })
        }
      >
        직무 변경하기
      </button>
    </div>
  );
}
