import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

const url = API_BASE_URL;

export const fetchStdDashboard = createAsyncThunk('student/fetchStdDashboard', async () => {

  const studentsRes = await fetch(`/api/users?role=student`);
  if (!studentsRes.ok) return null;
  const studentsData = await studentsRes.json();
  const student = Array.isArray(studentsData) && studentsData.length ? studentsDatac : null;
  if (!student) return null;

  
  const regsRes = await fetch(`/api/event_registrations?userId=${student.id}`);
  if (!regsRes.ok) {
    return { ...student, registeredEvents: [] };
  }
  const regs = await regsRes.json();
  if (!Array.isArray(regs) || regs.length === 0) {
    return { ...student, registeredEvents: [] };
  }


  {
    const normalized = (Array.isArray(regs) ? regs : [regs]).map((r) => ({
      ...r,
      eventId: r.eventId ?? r.event_id ?? r.event,
    }));
    const seen = new Set();
    const filtered = [];
    for (const r of normalized) {
      if (!r.eventId) continue;
      if (seen.has(r.eventId)) continue;
      seen.add(r.eventId);
      filtered.push(r);
    }

    regs.length = 0;
    regs.push(...filtered);
  }
  const ids = regs.map((r) => r.eventId || r.event_id).filter(Boolean);
  if (ids.length === 0) return { ...student, registeredEvents: [] };


  const events = await Promise.all(
    ids.map(async (id) => {
      try {
        const evRes = await fetch(`/api/events?id=${id}`);
        if (!evRes.ok) return null;
        const evData = await evRes.json();
        return Array.isArray(evData) && evData.length ? evData[0] : null;
      } catch (e) {
        return null;
      }
    }),
  );

  return { ...student, registeredEvents: events.filter(Boolean) };
});

// Fetch event registrations for a student and return the mapped event objects
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
    builder.addCase(fetchStdDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStdDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.student = action.payload;
    });
    builder.addCase(fetchStdDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error ? action.error.message : String(action.error);
    });
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
