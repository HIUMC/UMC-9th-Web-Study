import { useReducer, useState } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: payload ?? state.department,
        error: hasError ? "거부권이 행사가능, 카드메이커만 입력가능!" : null,
      };
    }
    default:
      return state;
  }
}

export const UseReducerCompany = () => {
  const [state, dispatch] = useReducer(reducer, { department: "SOFTWARE DEVELOPER", error: null });

  // const [error, setError] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  // const changeDepartment = () => {
  //   if (department != '카드메이커') {
  //     setError("거부권이 행사되었습니다.");
  //     return;
  //   }
  //   else {
  //     setDepartment(department);
  //     setError(null);
  //   }
  // }

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-20">
      <h1>{state.department}</h1>
      {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}

      <input
        className="w-[600px] rounded-2xl border border-amber-950"
        onChange={handleChangeDepartment}
        value={department}
        type="text"
        placeholder="변경하고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
      ></input>

      <button
        className="border border-amber-900"
        onClick={(): void => dispatch({ type: "CHANGE_DEPARTMENT", payload: department })}
      >
        직무 변경하기
      </button>
    </div>
  );
};
