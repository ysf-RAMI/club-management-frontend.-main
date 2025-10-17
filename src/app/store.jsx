import { configureStore } from '@reduxjs/toolkit';
import clubReducer from './clubSlice';
import eventReducer from './eventSlice';

export const store = configureStore({
  reducer: {
    clubs: clubReducer,
    events: eventReducer,
  },
});
