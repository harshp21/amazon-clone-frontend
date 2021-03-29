import React, { useReducer } from 'react'
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_ACCOUNT_ACTIVATION_SUCCESS,
    USER_ACCOUNT_ACTIVATION_FAILURE,
} from './user-actions';
import { UserContext } from './user-context';
import { userReducer } from './user-reducer';
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function UserState(props) {

    const initialState = {
        user: {},
        isUserLoggedIn: false,
        token: '',
        error: '',
    }
    const [state, dispatch] = useReducer(userReducer, initialState);
    const history = useHistory();

    const logInUser = async ({ emailId, password }, redirectPath = '/') => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/user/sign-in', { emailId, password });
            localStorage.setItem('jwt-token', result.data.token);
            toast.success(result.data.message);
            dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data });
            history.push(redirectPath);
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: USER_LOGIN_FAILURE })
        }
    }

    const signOutUser = () => {
        toast.success('User Logged out');
        localStorage.removeItem('jwt-token');
        dispatch({ type: USER_LOGOUT_SUCCESS });
    }

    const signUpUser = async (userCredentails) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/user/register', {
                emailId: userCredentails.emailId,
                username: userCredentails.username,
                password: userCredentails.password
            });
            toast.success(result.data.message);
            dispatch({ type: USER_SIGN_UP_SUCCESS, payload: result.data })
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: USER_SIGN_UP_FAILURE })
        }
    }

    const activateAccount = async (activationToken) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post(`/user/activate-account/${activationToken}`);
            dispatch({ type: USER_ACCOUNT_ACTIVATION_SUCCESS });
            toast.info(result.data.message);
            history.push('/sign-in');
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: USER_ACCOUNT_ACTIVATION_FAILURE })
        }
    }

    const retrievePassword = async (emailId) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/user/forgot-password', {
                emailId
            });
            toast.info(result.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const resetPassword = async (userCredentials, token) => {
        try {
            const axios = axiosInstance();
            const { password, confirmPassword } = userCredentials;
            console.log(token);
            const result = await axios.post('/user/reset-password', {
                password,
                confirmPassword,
                token
            });
            toast.success(result.data.message);
            history.push('/sign-in');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    const isUserLoggedIn = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/user/isUserLoggedIn');
            dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data });
            return true;
        } catch (err) {
            dispatch({ type: USER_LOGIN_FAILURE });
            return false;
        }
    }
    return (
        <UserContext.Provider value={{ userState: state, logInUser, signOutUser, signUpUser, activateAccount, retrievePassword, resetPassword, isUserLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
