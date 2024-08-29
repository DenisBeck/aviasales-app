/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ticketsAPI from '../../api/ticketsAPI';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { signal }) => {
  const searchId = await ticketsAPI.fetchSearchId(signal);
  return searchId;
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { getState, rejectWithValue }) => {
    try {
      const { tickets, stop } = await ticketsAPI.fetchTicketsById(searchId);
      return { tickets, stop };
    } catch (err) {
      if (getState().tickets.data.tickets) {
        return rejectWithValue('Данные получены не полностью');
      }
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  data: {
    searchId: null,
    tickets: null,
    countToRender: 5,
    stop: false,
    filteredAndSorted: [],
  },
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCountToRender: (state, action) => {
      state.data.countToRender = action.payload;
    },
    filterTickets: (state, action) => {
      state.data.filteredAndSorted = state.data.tickets.filter((item) =>
        item.segments.some((segment) => action.payload.includes(segment.stops.length))
      );
    },
    sortCheapest: (state) => {
      state.data.filteredAndSorted = state.data.filteredAndSorted.sort((a, b) => a.price - b.price);
    },
    sortFastest: (state) => {
      state.data.filteredAndSorted = state.data.filteredAndSorted.sort(
        (a, b) =>
          a.segments.reduce((sum, item) => sum + item.duration, 0) -
          b.segments.reduce((sum, item) => sum + item.duration, 0)
      );
    },
    sortOptimal: (state) => {
      state.data.filteredAndSorted = state.data.filteredAndSorted.sort(
        (a, b) =>
          a.price * a.segments.reduce((sum, item) => sum + item.duration, 0) -
          b.price * b.segments.reduce((sum, item) => sum + item.duration, 0)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.data.searchId = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (!state.data.tickets) {
          state.data.tickets = action.payload.tickets;
        } else {
          state.data.tickets = [...state.data.tickets, ...action.payload.tickets];
        }
        state.error = null;
        state.data.stop = action.payload.stop;
      });
  },
});

export const { sortCheapest, sortFastest, sortOptimal, setCountToRender, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
