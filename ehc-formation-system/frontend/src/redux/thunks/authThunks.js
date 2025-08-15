import {
    loginSuccess,
    loginFailure,
    logout,
    registerSuccess,
    registerFailure,
} from '../slices/authSlice';
import authService from '../../services/authService';

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await authService.login(credentials);
        // Assuming your backend returns a user object and a token upon successful login
        const {
            user,
            token
        } = response.data;
        dispatch(loginSuccess({
            user,
            token
        }));
        // Optionally store token in local storage or cookies
        localStorage.setItem('token', token);
        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        dispatch(loginFailure(message));
        return Promise.reject();
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const response = await authService.register(userData);
        dispatch(registerSuccess(response.data));
        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        dispatch(registerFailure(message));
        return Promise.reject();
    }
};

export const logoutUser = () => (dispatch) => {
    authService.logout();
    dispatch(logout());
    localStorage.removeItem('token'); // Clear token from local storage
};