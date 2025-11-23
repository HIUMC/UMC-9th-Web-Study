import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface modalActions {
  isOpen: () => void;
  isClose: () => void;
}

interface modalState {
  open: boolean;
  actions: modalActions;
}

export const useModalStore = create<modalState>()(
  immer((set, _) => ({
    open: false,
    actions: {
      isOpen: () => {
        set((state) => {
          state.open = true;
        });
      },
      isClose: () => {
        set((state) => {
          state.open = false;
        });
      },
    },
  }))
);

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      open: state.open,
    }))
  );

export const useModalActions = () => useModalStore((state) => state.actions);
