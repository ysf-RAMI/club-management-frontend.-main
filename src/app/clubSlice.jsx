import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const fetchClubs = createAsyncThunk('clubs/fetchClubs', async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clubs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchClubById = createAsyncThunk(
  'clubs/fetchClubById',
  async (clubId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`);
      if (response.status === 404) {
        return rejectWithValue('Club Not Found');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);



export const joinClub = createAsyncThunk('clubs/joinClub', async (club_id, { rejectWithValue }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return rejectWithValue('You must be logged in to join a club.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/clubs/join/${club_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const approveJoinClub = createAsyncThunk(
  'clubs/approveJoinClub',
  async ({ clubId, userId, status }, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('You must be logged in to approve a member.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}/approve-student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);



export const createClub = createAsyncThunk(
  'clubs/createClub',
  async (clubData, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('You must be logged in to create a club.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/clubs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: clubData, // clubData is expected to be FormData
      });

      console.log('Create Club Response Status:', response.status);
      console.log('Create Club Response OK:', response.ok);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Create Club Error Response:', errorData);
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateClub = createAsyncThunk(
  'clubs/updateClub',
  async ({ clubId, clubData }, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('You must be logged in to update a club.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`, {
        method: 'POST', // Use POST for FormData with Laravel for PUT/PATCH
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: clubData, // clubData is expected to be FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteClub = createAsyncThunk(
  'clubs/deleteClub',
  async (clubId, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('You must be logged in to delete a club.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // No content for 204 No Content, so we return a success message
      return { clubId, message: 'Club deleted successfully' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const applyFilters = (state) => {
  let filtered = [...state.clubs];

  // Apply category filter
  if (state.currentCategory && state.currentCategory !== 'all') {
    const selected = String(state.currentCategory).toLowerCase().trim();
    switch (selected) {
      case 'technology':
      case 'technologie':
      case 'tech':
        filtered = filtered.filter((club) => {
          const c = (club.categorie || club.category || '').toString().toLowerCase().trim();
          return c === 'technology' || c === 'technologie' || c === 'tech' || c.includes('tech');
        });
        break;
      case 'culture':
      case 'arts':
      case 'art':
        filtered = filtered.filter((club) => {
          const c = (club.categorie || club.category || '').toString().toLowerCase().trim();
          return c === 'culture' || c === 'arts & culture' || c === 'art' || c.includes('art');
        });
        break;
      case 'sports':
      case 'sport':
        filtered = filtered.filter((club) => {
          const c = (club.categorie || club.category || '').toString().toLowerCase().trim();
          return c === 'sports' || c === 'sport';
        });
        break;
      case 'litt\u00e9rature':
      case 'literature':
        filtered = filtered.filter((club) => {
          const c = (club.categorie || club.category || '').toString().toLowerCase().trim();
          return c === 'literature' || c === 'litt\u00e9rature' || c.includes('liter');
        });
        break;
      default:
        // Fallback: simple equality check
        filtered = filtered.filter((club) => {
          const c = (club.categorie || club.category || '').toString().toLowerCase().trim();
          return c === selected;
        });
        break;
    }
  }

  // Apply search filter
  if (state.currentSearch !== '') {
    const searchTerm = state.currentSearch.toLowerCase();
    filtered = filtered.filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm) ||
        club.description.toLowerCase().includes(searchTerm) ||
        (club.categorie && club.categorie.toLowerCase().includes(searchTerm)),
    );
  }

  state.filteredClubs = filtered;
  applySorting(state);
};

// Helper function to apply sorting
const applySorting = (state) => {
  switch (state.currentSort) {
    case 'name-asc':
      state.filteredClubs.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      state.filteredClubs.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'members-asc':
      state.filteredClubs.sort((a, b) => (a.max_members || 0) - (b.max_members || 0));
      break;
    case 'members-desc':
      state.filteredClubs.sort((a, b) => (b.max_members || 0) - (a.max_members || 0));
      break;
    default:
      break;
  }
};

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    filteredClubs: [],
    currentClub: null,
    currentCategory: 'all',
    currentSearch: '',
    currentSort: 'name-asc',
    loading: false,
    error: null,
    joinClubLoading: false,
    joinClubError: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.currentCategory = action.payload.category;
      applyFilters(state);
    },
    sortClubs: (state, action) => {
      state.currentSort = action.payload.sort;
      applySorting(state);
    },
    searchClubs: (state, action) => {
      state.currentSearch = action.payload.search;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.currentCategory = 'all';
      state.currentSearch = '';
      state.currentSort = 'name-asc';
      state.filteredClubs = [...state.clubs];

      applySorting(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
        state.filteredClubs = [...action.payload];
        applySorting(state);
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchClubById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClub = action.payload;
        state.error = null; // Clear any previous error
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.loading = false;
        state.currentClub = null; // Ensure currentClub is null on rejection
        state.error = action.payload || action.error.message;
      })
      .addCase(joinClub.pending, (state) => {
        state.joinClubLoading = true;
        state.joinClubError = null;
      })
      .addCase(joinClub.fulfilled, (state, action) => {
        state.joinClubLoading = false;
        // Optionally, update the currentClub or clubs list if the join was successful
        // For example, if the API returns the updated club with new member count
        if (state.currentClub && state.currentClub._id === action.payload._id) {
          state.currentClub = action.payload;
        }
        // You might also want to update the clubs array if it's displayed elsewhere
        const index = state.clubs.findIndex((club) => club._id === action.payload._id);
        if (index !== -1) {
          state.clubs[index] = action.payload;
        }
        const filteredIndex = state.filteredClubs.findIndex(
          (club) => club._id === action.payload._id,
        );
        if (filteredIndex !== -1) {
          state.filteredClubs[filteredIndex] = action.payload;
        }
        toast.info('Your request has been sent as pending !');
      })
      .addCase(joinClub.rejected, (state, action) => {
        state.joinClubLoading = false;
        state.joinClubError = action.payload;
        toast.error(action.payload || 'Failed to join the club.');
      });

    builder
      .addCase(createClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs.push(action.payload);
        applyFilters(state);
        toast.success('Club created successfully!');
      })
      .addCase(createClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload || 'Failed to create club.');
      });

    builder
      .addCase(updateClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClub.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clubs.findIndex((club) => club.id === action.payload.club.id);
        if (index !== -1) {
          state.clubs[index] = action.payload.club;
          applyFilters(state);
        }
        toast.success('Club updated successfully!');
      })
      .addCase(updateClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload || 'Failed to update club.');
      });

    builder
      .addCase(deleteClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = state.clubs.filter((club) => club.id !== action.payload.clubId);
        applyFilters(state);
        toast.success('Club deleted successfully!');
      })
      .addCase(deleteClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload || 'Failed to delete club.');
      });

    builder
      .addCase(approveJoinClub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveJoinClub.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update the currentClub or clubs list if the join was successful
        // For example, if the API returns the updated club with new member count
        if (state.currentClub && state.currentClub._id === action.payload._id) {
          state.currentClub = action.payload;
        }
        // You might also want to update the clubs array if it's displayed elsewhere
        const index = state.clubs.findIndex((club) => club._id === action.payload._id);
        if (index !== -1) {
          state.clubs[index] = action.payload;
        }
        const filteredIndex = state.filteredClubs.findIndex(
          (club) => club._id === action.payload._id,
        );
        if (filteredIndex !== -1) {
          state.filteredClubs[filteredIndex] = action.payload;
        }
        toast.success('Member approved successfully!');
        state.loading = false;
        // Re-fetch clubs to ensure the dashboard updates with the latest data
        // This is a more robust way to ensure UI consistency after approval/rejection
        // The fetchClubs thunk will be dispatched from the component after this action is handled.
      })
      .addCase(approveJoinClub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(action.payload || 'Failed to approve member.');
      });
  },
});

export const { changeCategory, sortClubs, searchClubs, clearFilters } = clubSlice.actions;

export default clubSlice.reducer;
