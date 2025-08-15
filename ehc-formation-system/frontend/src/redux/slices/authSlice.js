import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const {
                user,
                token
            } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        clearCredentials(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setCredentials,
    clearCredentials,
    setLoading,
    setError
} = authSlice.actions;

export default authSlice.reducer;