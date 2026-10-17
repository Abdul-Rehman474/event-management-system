import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { saveState } from '../utils/storage';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// runs afte EVERY dispatched action and keep localStorage in sync
store.subscribe(() => {
    const { auth } = store.getState();
    saveState('users', auth.users);
    saveState('currentUser', auth.currentUser);
});