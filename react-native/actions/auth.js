import { SIGNING, SIGNING_SUCCESS, SIGNING_ERROR, SIGNING_OUT, SIGN_OUT, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR, AUTH_RESET } from './types';

import { userSignIn, userSignOut, userSignUp } from '../api'
export const signInAction = (formdata) => {
    return dispatch => {
        dispatch({
            type: SIGNING
        });

        userSignIn(formdata)
            .then(data => {
                dispatch({
                    type: data.status==='success'?SIGNING_SUCCESS:SIGNING_ERROR,
                    data: data
                });
            })
            .catch(error => {
                dispatch({
                    type: SIGNING_ERROR,
                    error: error&&error.message?error:{message: 'Signin error please try again later'}
                });
            });
    };
};

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGNING_OUT
        });
        userSignOut().then(() => {
            dispatch({
                type: SIGN_OUT,
                data: {status: 'sussess'}
            });
        });
    };
};

export const signUpAction = (formdata) => {
    return dispatch => {
        dispatch({
            type: SIGNUP
        });

        userSignUp(formdata)
            .then(data => {
                dispatch({
                    type: data.status==='done'?SIGNUP_SUCCESS:SIGNUP_ERROR,
                    data: data
                });
            })
            .catch(error => {
                dispatch({
                    type: SIGNUP_ERROR,
                    error: error&&error.message?error:{message: 'Signup error please try again later'}
                });
            });
    };
}

export const resetAuthAction = () => {
    return dispatch => {
        dispatch({
            type: AUTH_RESET,
            data: null
        });
    }
}
