import {
    USER_ACCOUNT_ACTIVATION_SUCCESS,
    USER_ALREADY_LOGIN_FAILURE,
    USER_ALREADY_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_UP_SUCCESS
} from "./user-actions";

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isUserLoggedIn: true,
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                user: {},
                token: '',
                isUserLoggedIn: false,
            }
        case USER_SIGN_UP_SUCCESS:
            return {
                ...state,
            }
        case USER_SIGN_UP_FAILURE:
            return {
                ...state,
            }
        case USER_ACCOUNT_ACTIVATION_SUCCESS:
            return {
                ...state,
            };

        case USER_ALREADY_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
                isUserLoggedIn: true
            }
        case USER_ALREADY_LOGIN_FAILURE:
            return {
                ...state
            };
        default:
    }
}

export { userReducer };