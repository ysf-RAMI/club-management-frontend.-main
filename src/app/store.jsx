import { configureStore } from '@reduxjs/toolkit';
import clubReducer from './clubSlice';

export const store = configureStore({
  reducer: {
    clubs: clubReducer,
  },
});
