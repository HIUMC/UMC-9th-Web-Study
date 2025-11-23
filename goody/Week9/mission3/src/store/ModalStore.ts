import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
    isOpen : boolean;
    actions : ModalActions;
};

interface ModalActions {
    openModal : () => void;
    closeModal : () => void;
}

export const ModalStore = create<ModalState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, _) => ({
        isOpen : false,
        actions : {
            openModal : () => {
                set((state) => {
                    state.isOpen = true;
                });
            },
            closeModal : () => {
                set((state) => {
                    state.isOpen = false;
                });
            },
        }
    }))
)
