import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { saveState } from '../utils/storage';
import eventsReducer from '../features/events/eventsSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
    },
});

// runs afte EVERY dispatched action and keep localStorage in sync
store.subscribe(() => {
    const { auth } = store.getState();
    saveState('users', auth.users);
    saveState('currentUser', auth.currentUser);
});