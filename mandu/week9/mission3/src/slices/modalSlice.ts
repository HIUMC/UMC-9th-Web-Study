import { createSlice } from "@reduxjs/toolkit";

export interface modalState {
  open: boolean;
}

const initialState: modalState = {
  open: false,
};

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isOpen: (state) => {
      state.open = true;
    },
    isClose: (state) => {
      state.open = false;
    },
  },
});

export const { isOpen, isClose } = modalSlice.actions;

// duck pattern reducer는 export default로 내보내야함
const modalReducer = modalSlice.reducer;

export default modalReducer;
