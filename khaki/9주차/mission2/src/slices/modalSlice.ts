import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

// ModalSlice 생성
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

// duck pattern 방식으로 export
export const modalReducer = modalSlice.reducer;

// 액션 생성 함수들 내보내기
export const { openModal, closeModal } = modalSlice.actions;
