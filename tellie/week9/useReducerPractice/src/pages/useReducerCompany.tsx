import { useReducer, useState } from "react";

type TActionType = 'CHANGE_DEPARTMENT' | 'RESET';

interface IState {
    department: string;
    error: string | null;
}

interface IAction {
    type: TActionType;
    payload?: string;
}

function reducer(state: IState, action: IAction) {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_DEPARTMENT': {
            const newDepartment = payload;
            const hasError = newDepartment !== '카드메이커';
            return {
                ...state,
                department: hasError ? state.department : newDepartment,
                error: hasError ? '거부권 행사가능, 카드메이커만 입력 가능합니다.' : null,
            };
        }
        default:
            return state;
    }
}

const UseReducerCompany = () => {
    const [state, dispatch] = useReducer(reducer, {
        department: 'Software Developer',
        error: null,
    });

    const [department, setDepartment] = useState('');
    const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-light mb-2">{state.department}</h1>
            {state.error && <p className='text-red-500 text-lg mb-8'>{state.error}</p>}

            <div className="flex items-center gap-4">
                <input 
                    className='w-96 bg-transparent border border-gray-500 px-4 py-3 rounded text-white placeholder-gray-400 focus:outline-none focus:border-gray-300' 
                    placeholder='변경하시고 싶은 직무를 입력해주세요. 단, 거부권 행사 가능'
                    value={department} 
                    onChange={handleChangeDepartment} 
                />

                <button 
                    onClick={() => dispatch({type: 'CHANGE_DEPARTMENT', payload: department})}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded text-white transition-colors"
                > 
                    직무 변경하기
                </button>
            </div>
        </div>
    );
}
export default UseReducerCompany;
