import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async () => {
       
            const response = await fetch(`${API_BASE_URL}/api/events`);
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
           return data;
       
    }
);

export const fetchEventById = createAsyncThunk(
    'events/fetchEventById',
    async (eventId) => {
    
            const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        
    }
);

// Helper function to apply filters
const applyFilters = (state) => {
    let filtered = [...state.events];

    // Apply search filter
    if (state.currentSearch !== '') {
        const searchTerm = state.currentSearch.toLowerCase();
        filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            (event.club_name && event.club_name.toLowerCase().includes(searchTerm))
        );
    }

    // Apply club filter
    if (state.currentClub !== 'all') {
        filtered = filtered.filter(event => event.club_id === parseInt(state.currentClub));
    }

    state.filteredEvents = filtered;
    applySorting(state);
};

// Helper function to apply sorting
const applySorting = (state) => {
    switch (state.currentSort) {
        case 'date-asc':
            state.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            state.filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title-asc':
            state.filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            state.filteredEvents.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            break;
    }
};

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        filteredEvents: [],
        currentEvent: null,
        currentClub: null,
        currentSearch: '',
        currentSort: 'date-asc',
        loading: false,
        error: null,
    },
    reducers: {
        searchEvents: (state, action) => {
            state.currentSearch = action.payload.search;
            applyFilters(state);
        },
        filterByClub: (state, action) => {
            state.currentClub = action.payload.clubId;
            applyFilters(state);
        },
        sortEvents: (state, action) => {
            state.currentSort = action.payload.sort;
            applySorting(state);
        },
        clearEventFilters: (state) => {
            state.currentSearch = '';
            state.currentClub = 'all';
            state.currentSort = 'date-asc';
            state.filteredEvents = [...state.events];
            applySorting(state);
        }
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
                applySorting(state);
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEvent = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { searchEvents, filterByClub, sortEvents, clearEventFilters } = eventSlice.actions;

export default eventSlice.reducer;
