import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../utils/storage';

//  initial state (loaded from local storage)
const initialState = {
    users: loadState('users', []),             // all registered accounts
    currentUser: loadState('currentUser', null), // who is logged in (null = nobody)
    error: null,                                // message to show on the form
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            const { name, email, password } = action.payload;

            const exists = state.users.find((user) => user.email === email);
            if (exists) {
                state.error = 'An account with this email already exists';
                return;
            }

            state.users.push({ name, email, password });
            state.currentUser = { name, email };   // log them in right away
            state.error = null;
        },

        login: (state, action) => {
            const { email, password } = action.payload;

            const user = state.users.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) {
                state.error = 'Invalid email or password';
                return;
            }

            state.currentUser = { name: user.name, email: user.email };
            state.error = null;
        },

        logout: (state) => {
            state.currentUser = null;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;