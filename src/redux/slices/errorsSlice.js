import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorsCount: 0,
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorsCount: (state, action) => {
      state.errorsCount = action.payload;
    },
  },
});

export const { setErrorsCount } = errorsSlice.actions;
export default errorsSlice.reducer;
