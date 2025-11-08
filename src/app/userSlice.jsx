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

export const updateProfile = createAsyncThunk('user/updateProfile', async (formData) => {

  const res = await fetch(`${url}/api/users/${formData.get('id')}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }
  const updatedUser = await res.json();
  return updatedUser;
});

export const updatePassword = createAsyncThunk('user/updatePassword', async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
  try {
    console.log('=== UPDATE PASSWORD REQUEST ===');
    console.log('User ID:', userId);
    console.log('Endpoint:', `${url}/api/users/${userId}/updatePassword`);
    console.log('API Base URL:', url);
    console.log('Current Password:', currentPassword ? '***' : 'empty');
    console.log('New Password:', newPassword ? '***' : 'empty');
    console.log('Token:', localStorage.getItem('access_token') ? 'Present' : 'Missing');

    console.log('Starting fetch request...');

    const res = await fetch(`${url}/api/users/${userId}/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        _method: 'PUT',
        currentPassword,
        newPassword,
        newPassword_confirmation: newPassword,
      }),
    });

    console.log('Fetch completed!');
    console.log('Response Status:', res.status);

    console.log('Response Status:', res.status);
    console.log('Response OK:', res.ok);

    console.log('Response Status:', res.status);
    console.log('Response OK:', res.ok);
    console.log('Response Status Text:', res.statusText);
    console.log('Response Headers:', {
      contentType: res.headers.get('content-type'),
      contentLength: res.headers.get('content-length')
    });

    if (!res.ok) {
      // Try to get the response text first
      const responseText = await res.text();
      console.error('=== ERROR RESPONSE ===');
      console.error('Status Code:', res.status);
      console.error('Status Text:', res.statusText);
      console.error('Full Response Text:', responseText);
      console.error('Response Text (first 500 chars):', responseText.substring(0, 500));

      // Try to parse as JSON
      try {
        const errorData = JSON.parse(responseText);
        console.error('Parsed Error Data:', errorData);
        console.error('Error Message:', errorData.message);
        console.error('Error Details:', JSON.stringify(errorData, null, 2));
        return rejectWithValue(errorData.message || errorData || 'Failed to update password');
      } catch (parseError) {
        console.error('Failed to parse error response as JSON');
        console.error('Parse Error:', parseError.message);
        return rejectWithValue(`Server error (${res.status}): ${responseText.substring(0, 200)}`);
      }
    }

    const data = await res.json();
    console.log('✓ Password updated successfully');
    console.log('Response Data:', data);
    console.log('Message:', data.message);
    return data;
  } catch (error) {
    console.error('=== UPDATE PASSWORD EXCEPTION ===');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Full Error Object:', error);
    return rejectWithValue(error.message);
  }
}); export const userSlice = createSlice({
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
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addRegisteredEvent } = userSlice.actions;

export default userSlice.reducer;
