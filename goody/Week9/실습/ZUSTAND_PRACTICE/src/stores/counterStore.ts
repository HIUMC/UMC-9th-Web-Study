import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 상태에 대한 정의
interface CounterState {
    // value
    count : number;
    randomNum : number;

    // action
    actions : CounterActions;
    
}

interface CounterActions {
    increment : () => void;
    decrement : () => void;
    random : () => void;
}

export const useCounterStore = create<CounterState>()(devtools((set) => ({ 
    // 중괄호 => return 필요, 소괄호중괄호 => 리턴 생략 가능 set : 불변성 지켜줌 
    count : 0,
    randomNum : 0,
    actions : {
        increment : () => set((state) => ({
            // set(pratialOrUpdater, shouldReplace = false, actionName)
            count : state.count + 1,
            }),
            false,
            'increment',
            ),
        decrement : () => set((state) => ({
            count : state.count - 1,
            }),
            false,
            'decrement',),
        // 0 ~ 99 사이의 랜덤 숫자 생성 
        random : () => {
            return set(() => ({
                randomNum : Math.floor(Math.random() * 100),
            }), 
            false,
            'random',) 
        },
    }
    
})));

// 비지니스 로직 store에 중앙 집중화
// action에 관한 훅을 만들 수 있다.
// 참조의 안정성을 가질 수 있다
export const useCounterActions = () => useCounterStore((state) => state.actions);

// Atomic Selector => 모든 값은 개별로 꺼내야한다는 규칙
// actions의 객체는 한번 정의햇기에 함수의 참조(reference)가 바뀌지않는다
// => 컴포넌트가 항상 동일한 객체를 바라보기 때문에 렌더링에 문제가 없음.

// 테스트 용이
// 재사용성 좋음