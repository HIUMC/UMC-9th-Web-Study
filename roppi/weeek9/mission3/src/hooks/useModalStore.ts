
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useCartStore } from "./useCartStore";
import { useShallow } from "zustand/shallow";


// Zustand는 “actions 객체”를 꼭 만들 필요가 없음

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  confirmClear: () => void; //  모달 안에서 전체 삭제와 연동
}

const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,

    // 모달 열기
    open: () =>
      set((state) => {
        state.isOpen = true;
      }),

    // 모달 닫기
    close: () =>
      set((state) => {
        state.isOpen = false;
      }),

    // ✔ 모달에서 '네' 클릭 시: 장바구니 비우기 + 모달 닫기
    confirmClear: () => {
      // Zustand는 store끼리 import해서 .getState()로 액션 부를 수 있음.  
      //  cartStore에서 clearCart 액션 가져오기
      const clearCart = useCartStore.getState().actions.clearCart;
      clearCart(); // 1. cart 전체 삭제
      set((state) => {
        state.isOpen = false; // 2. 모달 닫기
      });
    },
  }))
);
export default useModalStore;

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );


export const useModalActions = () =>
  useModalStore(
    useShallow((state) => ({
      open: state.open,
      close: state.close,
      confirmClear: state.confirmClear,
    }))
  );


