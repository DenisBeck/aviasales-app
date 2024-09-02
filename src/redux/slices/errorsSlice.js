import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorsCount: 0,
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  selectors: {
    selectErrors: (state) => state.errorsCount,
  },
  reducers: {
    setErrorsCount: (state, action) => {
      state.errorsCount = action.payload;
    },
  },
});

export const { setErrorsCount } = errorsSlice.actions;
export const { selectErrors } = errorsSlice.selectors;
export default errorsSlice.reducer;
