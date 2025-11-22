import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalAction {
  close: () => void;
  open: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalAction;
}

export const useModalStore = create<ModalState>()(
  /* eslint-disable @typescript-eslint/no-unused-vars */ // eslint 에러 삭제
  immer((set, _) => ({
    isOpen: false,
    actions: {
      close: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
      open: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
    },
  }))
);

export const useModalInfo = () => useModalStore((state) => state.isOpen);

export const useModalAction = () => useModalStore((state) => state.actions);
