import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastState = {
  message: string | null;
  imageUri?: string;
  open: boolean;
  type: "Failed" | "Success" | "Info" | "Message" | null;
};

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    message: null,
    open: false,
    type: null,
  } as ToastState,
  reducers: {
    openToast: (
      state,
      action: PayloadAction<{
        message: string;
        imageUri?: string;
        type: "Failed" | "Success" | "Info" | "Message";
      }>
    ) => {
      state.open = true;
      state.imageUri = action.payload.imageUri;
      state.message = action.payload.message;
      state.type = action.payload.type;
      
    },
    closeToast: (state) => {
      state.open = false;
      state.message = null;
      state.type = null;
    },
  },
});

export default toastSlice.reducer;
export const { openToast, closeToast } = toastSlice.actions;
