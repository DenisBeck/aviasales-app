import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortingBy: 'cheapest',
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sortingBy = action.payload;
    },
  },
});

export const { setSort } = sortingSlice.actions;
export default sortingSlice.reducer;
