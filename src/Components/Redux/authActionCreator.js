import axios from 'axios';
import * as actionType from './actionTypes';

export const authSuccess = (token, userId) => ({
    type: actionType.AUTH_SUCCESS,
    payload: {
        token,
        userId,
    },
});

// eslint-disable-next-line no-unused-vars
export const auth = (email, password, mode) => (dispatch) => {
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
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.loaclId);
            const expired = new Date().getTime() + res.data.expiresIn * 1000;
            localStorage.setItem('expiresIn', expired);
            dispatch(authSuccess(res.data.idToken, res.data.loaclId));
        })
        .catch((error) => console.log(error.message));
};

export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
    } else {
        const expiresIn = localStorage.getItem('expiresIn');
        if (expiresIn <= new Date().getTime()) {
            // Logout
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
};
