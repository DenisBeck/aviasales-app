/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ticketsAPI from '../../api/ticketsAPI';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const searchId = await ticketsAPI.fetchSearchId();
    const { tickets } = await ticketsAPI.fetchTicketsById(searchId);
    return tickets;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  data: {
    tickets: null,
    countToRender: 5,
    stop: false,
    filteredAndSorted: [],
  },
  loading: false,
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
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.data.tickets = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data.tickets = action.payload;
      });
  },
});

export const { sortCheapest, sortFastest, sortOptimal, setCountToRender, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
