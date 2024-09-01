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
      if (getState().tickets.data) {
        return rejectWithValue('Данные получены не полностью');
      }
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  searchId: null,
  countToRender: 5,
  stop: false,
  filteredAndSorted: [],
  data: null,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCountToRender: (state, action) => {
      state.countToRender = action.payload;
    },
    filterTickets: (state, action) => {
      state.filteredAndSorted = state.data.filter((item) =>
        item.segments.some((segment) => action.payload.includes(segment.stops.length))
      );
    },
    sortCheapest: (state) => {
      state.filteredAndSorted = state.filteredAndSorted.sort((a, b) => a.price - b.price);
    },
    sortFastest: (state) => {
      state.filteredAndSorted = state.filteredAndSorted.sort(
        (a, b) =>
          a.segments.reduce((sum, item) => sum + item.duration, 0) -
          b.segments.reduce((sum, item) => sum + item.duration, 0)
      );
    },
    sortOptimal: (state) => {
      state.filteredAndSorted = state.filteredAndSorted.sort(
        (a, b) =>
          a.price * a.segments.reduce((sum, item) => sum + item.duration, 0) -
          b.price * b.segments.reduce((sum, item) => sum + item.duration, 0)
      );
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
        if (!state.data) {
          state.data = action.payload.tickets;
        } else {
          state.data = [...state.data, ...action.payload.tickets];
        }
        state.error = null;
        state.stop = action.payload.stop;
      });
  },
});

export const { sortCheapest, sortFastest, sortOptimal, setCountToRender, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
