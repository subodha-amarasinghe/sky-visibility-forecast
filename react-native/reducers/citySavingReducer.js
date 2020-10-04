import {SAVING_CITY, SAVING_CITY_SUCCESS, SAVING_CITY_ERROR} from '../actions/types'

const initialState = {
    fetching: false,
    status: null,
}

const citySavingReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SAVING_CITY:
            return Object.assign({}, state, { fetching: true });
        case SAVING_CITY_SUCCESS:
            return Object.assign(
                {},
                state,
                { fetching: false, status: action.data.status}
            );
        case SAVING_CITY_ERROR:
            return Object.assign(
                {},
                state,
                { fetching: false, status: 'error', error: action.data}
            );
        default: 
            return state 
    }
}

export default citySavingReducer;