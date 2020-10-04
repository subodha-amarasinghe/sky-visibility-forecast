import {SIGNING, SIGNING_SUCCESS, SIGNING_ERROR, SIGNING_OUT, SIGN_OUT, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR, AUTH_RESET } from '../actions/types'

const initialState = {
    fetching: false,
    user: null,
    isAuthenticated: false,
    isSigningUp: false,
    registeredUser: null
}

const authReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SIGNING:
            return Object.assign({}, state, { fetching: true, error:null });
        case SIGNING_SUCCESS:
            return Object.assign(
                {},
                state,
                { isAuthenticated: true, fetching: false, user: action.data, error:null}
            );
        case SIGNING_ERROR:
            return Object.assign(
                {},
                state,
                { fetching: false, isAuthenticated: false, error: action.data, user:null}
            );
        case SIGNING_OUT:
            return Object.assign({}, state, { fetching: true });

        case SIGN_OUT:
            return Object.assign(
                {},
                state,
                { fetching: false, isAuthenticated: false, error: null, user:null}
            );
        case SIGNUP:
            return Object.assign(
                {},
                state,
                { isSigningUp: true, fetching: false, isAuthenticated: false, error: null, user:null}
            );
        case SIGNUP_SUCCESS:
            return Object.assign(
                {},
                state,
                { isSigningUp: false, registeredUser:action.data, fetching: false, isAuthenticated: false, error: null, user:null}
            );
        case SIGNUP_ERROR:
            return Object.assign(
                {},
                state,
                { isSigningUp: false, registeredUser:{status:'error', data:action.data}, fetching: false, isAuthenticated: false, error: null, user:null}
            );
        case AUTH_RESET:
            return Object.assign({}, state, { fetching: true, error:null }); 
        default: 
            return state 
        
    }
}

export default authReducer;