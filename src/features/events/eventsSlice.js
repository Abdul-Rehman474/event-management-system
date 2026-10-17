import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchEvents } from '../../services/ticketmaster';

// The thunk: does the async API call
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await searchEvents(filters);   // becomes action.payload in "fulfilled"
        } catch (err) {
            return rejectWithValue(err.message);  // becomes action.payload in "rejected"
        }
    }
);

const initialState = {
    list: [],
    status: 'idle',
    error: null,
    page: 0,
    totalPages: 0,
    filters: {
        keyword: '',
        category: '',
        city: '',
        startDate: '',
        page: 0,
    },
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            // any filter change goes back to page 0, unless a page is given
            state.filters = { ...state.filters, page: 0, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.events;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { setFilters, resetFilters } = eventsSlice.actions;
export default eventsSlice.reducer;