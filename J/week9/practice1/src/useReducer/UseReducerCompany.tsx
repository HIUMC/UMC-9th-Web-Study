import { useReducer, useState, type ChangeEvent } from "react";

type TActionType = 'CHANGE_DEPARTMENT' | 'RESET';

interface IState {
    department: string;
    error: string | null;
}

interface IAction {
    type: TActionType;
    payload?: string;
}

const initialState: IState = {
    department: "Sofrware Developer",
    error: null,
};

function reducer(state: IState, action: IAction) {
    const { type, payload} = action;

    switch (type) {
        case 'CHANGE_DEPARTMENT': {
            const newDepartment = payload;
            const hasError = newDepartment !== "카드메이커";
            return {
                ...state,
                department: hasError ? state.department : newDepartment,
                error: hasError ? "거부권 행사 가능, 카드메이커만 입력 가능합니다." : null,
            };
        }
        case 'RESET': {
            return initialState;
        }
        default:
            return state;
    }
}

export default function UseReducerCompany() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [department, setDepartment] = useState("");

    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-neutral-800 text-white gap-3">
            <h1 className="text-4xl">{state.department}</h1>
            {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}
            <input
                className="w-[600px] border mt-10 p-4 rounded-md"
                placeholder="변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
                value={department}
                onChange={handleChangeDepartment}
            />
            <div className="flex flex-row gap-3">
                <button
                    onClick={() => {
                        dispatch({type: 'CHANGE_DEPARTMENT', payload: department})
                        setDepartment("")
                    }}
                    className="bg-neutral-900 py-1 px-2 rounded-lg"
                >
                    직무 변경하기
                </button>
                <button
                    onClick={() => {
                        dispatch({type: 'RESET'})
                        setDepartment("")
                    }}
                    className="bg-neutral-900 py-1 px-2 rounded-lg"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}