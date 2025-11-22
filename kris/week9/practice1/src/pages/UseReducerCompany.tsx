import { useReducer, useState, type ChangeEvent } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_DEPARTMENT":
      const newDepartment = payload || "";
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError ? "카드메이커만 지원 가능합니다." : null,
      };
    default:
      return state;
  }
}
export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: "Engineering",
    error: null,
  });

  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1>{state.department}</h1>
      <p>{state.error}</p>
      <input
        type="text"
        value={department}
        onChange={handleChangeDepartment}
        className="border-1 border-black"
      />
      <button
        className="border-1 border-black p-1"
        onClick={() =>
          dispatch({
            type: "CHANGE_DEPARTMENT",
            payload: department,
          })
        }
      >
        직무 변경
      </button>
    </div>
  );
}
