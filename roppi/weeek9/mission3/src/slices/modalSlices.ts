import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean; // 모달 열림/닫힘 여부
}

const initialState: ModalState = {
  isOpen: false,
};

// 모달을 여는(open) / 닫는(close) 기능만 이 reducer 안에서 관리함
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true; 
    },
    closeModal: (state) => {
      state.isOpen = false; 
    },
  },
});

// 액션 생성자 내보내기
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
