import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ticketsAPI from '../../api/ticketsAPI';

import { setErrorsCount } from './errorsSlice';

const initialState = {
  searchId: null,
  countToRender: 5,
  stop: false,
  data: null,
  error: null,
};

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { signal }) => {
  const searchId = await ticketsAPI.fetchSearchId(signal);
  return searchId;
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { getState, rejectWithValue, dispatch }) => {
    const { errorsCount } = getState().errors;
    try {
      const { tickets, stop } = await ticketsAPI.fetchTicketsById(searchId);

      if (errorsCount !== 0) {
        dispatch(setErrorsCount(0));
      }

      return { tickets, stop };
    } catch (err) {
      const { data } = getState().tickets;

      dispatch(setErrorsCount(errorsCount + 1));

      if (data) {
        return rejectWithValue('Данные получены не полностью');
      }
      return rejectWithValue(err.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCountToRender: (state, action) => {
      state.countToRender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (action.payload) {
          if (!state.data) {
            state.data = action.payload.tickets;
          } else {
            state.data = [...state.data, ...action.payload.tickets];
          }
          state.error = null;
          state.stop = action.payload.stop;
        }
      });
  },
});

export const { setCountToRender } = ticketsSlice.actions;
export default ticketsSlice.reducer;
