import { configureStore } from '@reduxjs/toolkit';
import clubReducer from './clubSlice';
import eventReducer from './eventSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    clubs: clubReducer,
    events: eventReducer,
    user: userSlice,
  },
});
