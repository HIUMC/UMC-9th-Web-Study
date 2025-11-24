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
  immer((set, _) => ({
    isOpen: false,
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

export const useModalInfo = () => {
  return useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );
};

export const useModalActions = () => useModalStore((state) => state.actions);
