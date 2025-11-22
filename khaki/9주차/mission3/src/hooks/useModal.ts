import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    // 초기 state
    isOpen: false,

    // action 함수들
    actions: {
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },

      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

// state 정보만 가져오는 커스텀 훅
export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );

// action 함수들만 가져오는 커스텀 훅
export const useModalActions = () =>
  useModalStore(
    useShallow((state) => ({
      openModal: state.actions.openModal,
      closeModal: state.actions.closeModal,
    }))
  );
