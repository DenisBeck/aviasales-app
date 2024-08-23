/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

export const MAX_TRANSFER_COUNT = 3;

const initialState = {
  transfers: function getArr() {
    const t = [];
    let i = 0;
    while(i <= MAX_TRANSFER_COUNT) {
      i++;
      t.push(false);
    }
    return t;
  }()
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleAllTransfers: (state) => {
      state.transfers = state.transfers.map(item => !item);
    },
    toggleTransfersCount: (state, action) => {
      state.transfers = state.transfers.map((item, index) => {
        if (index === action.payload) {
          return !item;
        }
        return item;
      });
    }
  },
});

export const { toggleAllTransfers, toggleTransfersCount } = filterSlice.actions;
export default filterSlice.reducer;