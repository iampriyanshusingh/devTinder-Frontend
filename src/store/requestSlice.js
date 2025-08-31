import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch pending requests count
export const fetchPendingRequestsCount = createAsyncThunk(
  'requests/fetchPendingCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/requests/received', { 
        withCredentials: true 
      });
      const pendingRequests = response.data?.data || [];
      return pendingRequests.length;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch requests count');
    }
  }
);

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    pendingCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    incrementPendingCount: (state) => {
      state.pendingCount += 1;
    },
    decrementPendingCount: (state) => {
      if (state.pendingCount > 0) {
        state.pendingCount -= 1;
      }
    },
    setPendingCount: (state, action) => {
      state.pendingCount = action.payload;
    },
    clearPendingCount: (state) => {
      state.pendingCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRequestsCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRequestsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingCount = action.payload;
        state.error = null;
      })
      .addCase(fetchPendingRequestsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  incrementPendingCount, 
  decrementPendingCount, 
  setPendingCount, 
  clearPendingCount 
} = requestSlice.actions;

export default requestSlice.reducer;
