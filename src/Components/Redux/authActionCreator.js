import axios from 'axios';
import * as actionType from './actionTypes';

// Auth Success Action Create
export const authSuccess = (token, userId) => ({
    type: actionType.AUTH_SUCCESS,
    payload: {
        token,
        userId,
    },
});

// Auth Loading Action Create
export const authLoading = (isLoading) => ({
    type: actionType.AUTH_LOADING,
    payload: isLoading,
});

// Auth Failed Action Create
export const authFailed = (errMsg) => ({
    type: actionType.AUTH_FAILED,
    payload: errMsg,
});

// Auth Failed Action Create
export const authErrRemove = () => ({
    type: actionType.AUTH_ERR_REMOVE,
});

// Logout Check Action & Dispatch
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');
    return {
        type: actionType.AUTH_LOGOUT,
    };
};

// Authentication Check Action & Dispatch
export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
        dispatch(authLogout());
    } else {
        const expiresIn = localStorage.getItem('expiresIn');
        if (expiresIn <= new Date().getTime()) {
            // Logout
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
};

// Signup and Login Action Create & authSuccess, authLoading, authFailed Dispatch
export const auth = (email, password, mode) => (dispatch) => {
    // Loading Dispatch
    dispatch(authLoading(true));
    const credential = {
        email,
        password,
        returnSecureToken: true,
    };
    const API_KEY = 'AIzaSyCB1hvFAICPUy1f4Ha7VPp0F-yfZoxByJs';
    let AUTH_URL = null;
    if (mode === 'login') {
        AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
        AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    axios
        .post(AUTH_URL, credential)
        .then((res) => {
            // Loading Dispatch
            dispatch(authLoading(false));
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            const expired = new Date().getTime() + res.data.expiresIn * 1000;
            localStorage.setItem('expiresIn', expired);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
        })
        .catch((err) => {
            // Loading Dispatch
            dispatch(authLoading(false));
            console.log(err.response.data.error.message);
            dispatch(authFailed(err.response.data.error.message));
        });
};
