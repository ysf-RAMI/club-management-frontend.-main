import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = import.meta.env.VITE_API_URL;

export const fetchClubs = createAsyncThunk(
    'clubs/fetchClubs',
    async () => {
        const response = await fetch(`${url}/clubs`);
        const data = await response.json();
        return data;
    }
);

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clubSlice.reducer;
