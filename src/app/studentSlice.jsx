import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

const url = API_BASE_URL;

export const fetchStudentRegisteredEvents = createAsyncThunk(
  'student/fetchStudentRegisteredEvents',
  async (userId) => {
    if (!userId) return [];
    // Get registrations from db (json-server style)
    const res = await fetch(`/api/event_registrations?userId=${userId}`);
    if (!res.ok) return [];
    const regs = await res.json();

    const events = await Promise.all(
      regs.map(async (r) => {
        const eventId = r.eventId || r.event_id || r.eventId;
        // json-server supports /events?id=1 which returns an array
        const evRes = await fetch(`/api/events?id=${eventId}`);
        if (!evRes.ok) return null;
        const evData = await evRes.json();
        return Array.isArray(evData) && evData.length ? evData[0] : null;
      }),
    );

    return events.filter(Boolean);
  },
);

export const fetchUserById = createAsyncThunk(
  'student/fetchUserById',
  async (userId) => {
    const res = await fetch(`${url}/api/users/${userId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }
    const userData = await res.json();
    return userData;
  }
);

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: null,
    loading: false,
    registeredEvents: [],
    registeredLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // registered events
    builder.addCase(fetchStudentRegisteredEvents.pending, (state) => {
      state.registeredLoading = true;
    });
    builder.addCase(fetchStudentRegisteredEvents.fulfilled, (state, action) => {
      state.registeredLoading = false;
      state.registeredEvents = action.payload;
    });
    builder.addCase(fetchStudentRegisteredEvents.rejected, (state) => {
      state.registeredLoading = false;
      state.registeredEvents = [];
    });
  },
});

export default studentSlice.reducer;
