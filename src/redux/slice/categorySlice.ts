import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Category = {
  categoryId: string;
};

const category = createSlice({
  name: 'category',
  initialState: {
    categoryId: 'all',
  } as Category,
  reducers: {
    setCategory: (
      state,
      action: PayloadAction<{
        categoryId: string;
      }>,
    ) => {
      state.categoryId = action.payload.categoryId;
    },
  },
});

export default category.reducer;
export const { setCategory } = category.actions;
