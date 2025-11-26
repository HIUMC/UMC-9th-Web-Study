import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 액션 타입 정의
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  random: () => void;
}

// 상태 정의
interface CounterState {
  // count
  count: number;

  // randomNumber
  randomNumber: number;

  // action
  actions: CounterActions;
}

// ({}) -> return 생략 가능
// {} -> return 명시 해야함
export const useCounterStore = create<CounterState>()(
  devtools((set) => ({
    count: 0,
    randomNumber: 0,

    actions: {
      increment: () =>
        // set(partialOrUpdator, shouldReplace = false, actionName)
        set(
          (state) => ({
            count: state.count + 1,
          }),
          undefined,
          // true : Replace가 가능하다 , false : Replace가 불가능하다
          // false일 경우 기존 값 유지, true일 경우 바뀐 값만 저장 (...state와 같은 기능)
          "increment"
        ),
      decrement: () => {
        return set(
          (state) => ({
            count: state.count - 1,
          }),
          false,
          "decrement"
        );
      },
      random: () => {
        set(
          () => ({
            randomNumber: Math.floor(Math.random() * 100),
          }),
          false,
          "random"
        );
      },
    },
    name: "counterStore",
  }))
);

// action에 관한 훅을 하나 만들 수 있다.
// 이제 이 action에 관련된 내용을 따로 뽑을 수 있다.
// 참조의 안전성을 가질 수 있다.
export const useCounterActions = () =>
  useCounterStore((state) => state.actions);

// Atomic Selector : 모든 값은 개별로 꺼내야한다는 규칙
// actions의 객체는 이미 한번 정의를 했기 때문에 함수의 참조(reference)가 바뀌지 않는다.
// 따라서 컴포넌트가 항상 동일한 객체를 바라보기 때문에 렌더링에 문제가 없음.
// 테스트 용이 &  재사용성 good
