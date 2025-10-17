import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

export const fetchClubs = createAsyncThunk('clubs/fetchClubs', async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clubs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API not available, using local data:', error.message);
    const response = await fetch('/data.json');
    const data = await response.json();
    return data.clubs;
  }
});

export const fetchClubById = createAsyncThunk('clubs/fetchClubById', async (clubId) => {
  const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`);

  const data = await response.json();
  return data;
});

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
      case 'literature':
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
      state.filteredClubs.sort((a, b) => (a.maxMembrs || 0) - (b.maxMembrs || 0));
      break;
    case 'members-desc':
      state.filteredClubs.sort((a, b) => (b.maxMembrs || 0) - (a.maxMembrs || 0));
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
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { changeCategory, sortClubs, searchClubs, clearFilters } = clubSlice.actions;

export default clubSlice.reducer;
