/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

import sortingReducer from './slices/sortingSlice';
import filterReducer from './slices/filterSlice';
import ticketsReducer from './slices/ticketsSlice';
import errorsReducer from './slices/errorsSlice';

export const store = configureStore({
  reducer: {
    errors: errorsReducer,
    sorting: sortingReducer,
    filter: filterReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
