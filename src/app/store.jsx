import { configureStore } from '@reduxjs/toolkit';
import clubReducer from './clubSlice';
import eventReducer from './eventSlice';
import studentReducer from './studentSlice';

export const store = configureStore({
  reducer: {
    clubs: clubReducer,
    events: eventReducer,
    student: studentReducer,
  },
});
