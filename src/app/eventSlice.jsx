import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export const addEvents = createAsyncThunk(
  'events/addEvents',
  async (eventData, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('User not authenticated');
    }
    try {
      console.log('Event Data (raw FormData object):', eventData);
      for (let [key, value] of eventData.entries()) {
        console.log(key, value);
      }
      console.log('Request Headers:', { Authorization: `Bearer ${token}` });
      console.log('API Endpoint:', `${API_BASE_URL}/api/events`);

      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: eventData,
      }); console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      console.log('Response Headers:', {
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length')
      });

      if (!response.ok) {
        // Try to get the response text first to see what we're dealing with
        const responseText = await response.text();
        console.error('=== ERROR RESPONSE ===');
        console.error('Status:', response.status);
        console.error('Response Text (first 500 chars):', responseText.substring(0, 500));

        // Try to parse as JSON if possible
        try {
          const errorData = JSON.parse(responseText);
          console.error('Parsed Error Data:', errorData);
          return rejectWithValue(errorData.message || errorData);
        } catch (parseError) {
          console.error('Could not parse error response as JSON');
          return rejectWithValue(`Server error (${response.status}): ${responseText.substring(0, 200)}`);
        }
      }

      const data = await response.json();
      console.log('✓ Success Response:', data);
      toast.success('Event added successfully');
      return data;
    } catch (error) {
      console.error('=== FETCH EXCEPTION ===');
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
      return rejectWithValue(error.message);
    }
  },
);
export const updateEvents = createAsyncThunk(
  'events/updateEvents',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('User not authenticated');
    }
    try {
      eventData.append('_method', 'PUT');
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: eventData,

      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      toast.success('Event updated successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const deleteEvents = createAsyncThunk(
  'events/deleteEvents',
  async (eventId, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('User not authenticated');
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      toast.success('Event deleted successfully');
      return eventId; // Return the ID of the deleted event
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch(`${API_BASE_URL}/api/events`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
});

export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async ({ eventId }, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/events/register/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue('Event Not Found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast.success('Registration successful');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue('Event Not Found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeEventStatus = createAsyncThunk(
  'events/changeEventStatus',
  async ({ eventId, status }, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      toast.success('Event status updated successfully');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchClubs = createAsyncThunk('events/fetchClubs', async () => {
  const response = await fetch(`${API_BASE_URL}/api/clubs`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
});

// Helper function to apply filters
const applyFilters = (state) => {
  let filtered = [...state.events];

  // Apply search filter
  if (state.currentSearch !== '') {
    const searchTerm = state.currentSearch.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        (event.title && event.title.toLowerCase().includes(searchTerm)) ||
        (event.description && event.description.toLowerCase().includes(searchTerm)) ||
        (event.club && event.club.name && event.club.name.toLowerCase().includes(searchTerm)),
    );
  }

  if (state.filterClub !== '') {
    filtered = filtered.filter((event) => event.club.name === state.filterClub);
  }

  // Apply status filter
  if (state.currentStatus !== '') {
    filtered = filtered.filter((event) => event.status === state.currentStatus);
  }

  state.filteredEvents = filtered;
  applySorting(state);
};

const applySorting = (state) => {
  switch (state.sortBy) {
    case 'date':
      state.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'club':
      state.filteredEvents.sort((a, b) => a.club.name.localeCompare(b.club.name));
      break;
    default:
      break;
  }
};

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    clubs: [],
    filteredEvents: [],
    currentEvent: null,
    filterClub: '',
    currentSearch: '',
    currentStatus: '', // New state for status filter
    sortBy: '',
    loading: false,
    error: null,
  },
  reducers: {
    searchEvents: (state, action) => {
      state.currentSearch = action.payload.search;
      applyFilters(state);
    },
    filterByClub: (state, action) => {
      state.filterClub = action.payload.clubName;
      applyFilters(state);
    },
    filterByStatus: (state, action) => { // New reducer for status filter
      state.currentStatus = action.payload.status;
      applyFilters(state);
    },
    sortEvents: (state, action) => {
      state.sortBy = action.payload.sort;
      applySorting(state);
    },
    clearEventFilters: (state) => {
      state.currentSearch = '';
      state.filterClub = '';
      state.currentStatus = ''; // Clear status filter
      state.sortBy = '';
      state.filteredEvents = [...state.events];
      applySorting(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.filteredEvents = [...action.payload];
        applyFilters(state);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
        state.error = null; // Clear any previous errors on success
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.currentEvent = null; // Ensure currentEvent is null on rejection
        state.error = action.payload || action.error.message; // Use payload for specific errors (e.g., 404)
      })
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear any previous errors on success
        // Assuming action.payload contains the newly registered event or its ID
        // You might need to fetch the full event details if payload only contains ID
        // For now, let's assume action.payload is the full event object or an object containing event_id
        const registeredEventId = action.payload.event_id || action.payload.id;
        if (registeredEventId) {
          const eventIndex = state.events.findIndex((event) => event.id === registeredEventId);
          if (eventIndex !== -1) {
            // If the event already exists, update it (e.g., set a 'isRegistered' flag)
            // This part depends on how your event object is structured and what 'registration' means for its state
            // For simplicity, let's assume we just want to mark it as registered or update its registration count
            // If the backend returns the updated event, you can replace it directly:
            state.events[eventIndex] = { ...state.events[eventIndex], ...action.payload };
          } else {
            // If the event is not in the list, add it (this might happen if the event was not initially fetched)
            state.events.push(action.payload);
          }
        }
        applyFilters(state);
        applySorting(state);
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Use payload for specific errors (e.g., 404)
      })
      .addCase(changeEventStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeEventStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Update the status of the event in the events array
        const updatedEvent = action.payload.event; // Assuming the backend returns the updated event
        const index = state.events.findIndex((event) => event.id === updatedEvent.id);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
        applyFilters(state);
      })
      .addCase(changeEventStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        applyFilters(state);
      })
      .addCase(addEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvents.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        applyFilters(state);
      })
      .addCase(updateEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.id !== action.payload);
        applyFilters(state);
      })
      .addCase(deleteEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { searchEvents, filterByClub, sortEvents, clearEventFilters } = eventSlice.actions;

export default eventSlice.reducer;
