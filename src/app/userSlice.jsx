import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

const url = API_BASE_URL;

export const fetchUserRegisteredEvents = createAsyncThunk(
  'user/fetchUserRegisteredEvents',
  async (userId) => {
    if (!userId) return [];

    const eventsRes = await fetch(`${url}/api/events`);
    if (!eventsRes.ok) {
      throw new Error(`Failed to fetch events: ${eventsRes.status}`);
    }
    const allEvents = await eventsRes.json();

    const registeredEvents = allEvents.filter(
      (event) => event.users && event.users.some((user) => user.id === userId),
    );

    return registeredEvents;
  },
);

export const fetchUserById = createAsyncThunk('student/fetchUserById', async (userId) => {
  const res = await fetch(`${url}/api/users/${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  const userData = await res.json();
  return userData;
});

export const fetchPendingClubRequests = createAsyncThunk(
  'user/fetchPendingClubRequests',
  async (userId) => {
    if (!userId) return [];
    const res = await fetch(`${url}/api/clubs`);
    if (!res.ok) {
      throw new Error('Failed to fetch clubs');
    }
    const clubs = await res.json();
    const pendingRequests = clubs.filter(
      (club) =>
        club.users &&
        club.users.some((user) => user.id === userId && user.pivot.status === 'pending'),
    );
    return pendingRequests;
  },
);

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const res = await fetch(`${url}/api/users`);
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  const users = await res.json();
  return users;
});

export const makeAdmin = createAsyncThunk('user/makeAdmin', async ({ userId, clubId }) => {
  console.log('userId', userId, 'clubId', clubId);
  const res = await fetch(`${url}/api/clubs/${clubId}/admin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) {
    throw new Error('Failed to make admin');
  }
  const userData = await res.json();
  return userData;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    registeredEvents: [],
    registeredEventsLoading: false,
    registeredLoading: false,
    error: null,
    organizer: null,
    clubRequests: [],
    clubRequestsLoading: false,
    users: [],
  },
  reducers: {
    addRegisteredEvent: (state, action) => {
      console.log('Adding registered event:', action.payload);
      state.registeredEvents = [...state.registeredEvents, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUserRegisteredEvents.pending, (state) => {
      state.registeredEventsLoading = true;
    });
    builder.addCase(fetchUserRegisteredEvents.fulfilled, (state, action) => {
      state.registeredEventsLoading = false;
      state.registeredEvents = action.payload;
    });
    builder.addCase(fetchUserRegisteredEvents.rejected, (state, action) => {
      state.registeredEventsLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchPendingClubRequests.pending, (state) => {
      state.clubRequestsLoading = true;
    });
    builder.addCase(fetchPendingClubRequests.fulfilled, (state, action) => {
      state.clubRequestsLoading = false;
      state.clubRequests = action.payload;
    });
    builder.addCase(fetchPendingClubRequests.rejected, (state, action) => {
      state.clubRequestsLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(makeAdmin.pending, (state) => {
      state.registeredLoading = true;
    });
    builder.addCase(makeAdmin.fulfilled, (state, action) => {
      state.registeredLoading = false;
      state.user = action.payload;
    });
    builder.addCase(makeAdmin.rejected, (state, action) => {
      state.registeredLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addRegisteredEvent } = userSlice.actions;

export default userSlice.reducer;
