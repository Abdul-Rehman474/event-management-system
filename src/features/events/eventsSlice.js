import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchEvents, getEventById } from '../../services/ticketmaster'; // ⬅ added getEventById

//list of events (search, filters, pages)
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await searchEvents(filters);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// one event by id (details page)
export const fetchEventById = createAsyncThunk(
    'events/fetchEventById',
    async (id, { rejectWithValue }) => {
        try {
            return await getEventById(id);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    // list page
    list: [],
    status: 'idle',
    error: null,
    page: 0,
    totalPages: 0,

    //detail page:
    selected: null,
    selectedStatus: 'idle',
    selectedError: null,

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
            // Any filter change goes back to page 0, unless a page is given
            state.filters = { ...state.filters, page: 0, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder
            // ----- fetchEvents (list) -----
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
            })

            // ⬅ ----- fetchEventById (details) -----
            .addCase(fetchEventById.pending, (state) => {
                state.selectedStatus = 'loading';
                state.selected = null;
                state.selectedError = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.selectedStatus = 'succeeded';
                state.selected = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.selectedStatus = 'failed';
                state.selectedError = action.payload || 'Something went wrong';
            });
    },
});

export const { setFilters, resetFilters } = eventsSlice.actions;
export default eventsSlice.reducer;