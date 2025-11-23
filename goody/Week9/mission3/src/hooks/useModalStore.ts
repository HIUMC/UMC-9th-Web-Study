import { ModalStore } from "../store/ModalStore";

export const useModalInfo = () => ModalStore((state) => state.isOpen);

export const useModalActions = () => ModalStore((state) => state.actions);