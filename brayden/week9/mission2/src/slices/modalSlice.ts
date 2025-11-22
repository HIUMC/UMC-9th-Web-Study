import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Todo : isOpen -> true => 모달 열기
    openModal: (state) => {
      state.isOpen = true;
    },
    // Todo : isOpen -> false => 모달 닫기
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});
export const { closeModal, openModal } = modalSlice.actions;

// duck pattern
const modalReducer = modalSlice.reducer;

export default modalReducer;
