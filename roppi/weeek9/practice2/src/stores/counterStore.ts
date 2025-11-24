import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterAction {
  increment: () => void;
  decrement: () => void;
  random: () => void;
} 

interface CounterState {
  //count
  count: number;
  // randomNumber
  randomNumber: number;

  // actions
  actions: CounterAction;
}

export const useCounterStore = create<CounterState>( (set) => ({
  count: 0,
  randomNumber: 0,

  actions:{
    // set(partialOrUpdater, shouldReplace = false, actionName)
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  
    // 0~99 사이의 랜덤 숫자 생성
    random: () =>
      set(() => ({ randomNumber: Math.floor(Math.random() * 100) })),
  }
}))