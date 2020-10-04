import {LOADING_CITY_LIST, RECEIVED_CITY_LIST, CITY_LIST_ERROR, DELETE_CITY, DELETE_CITY_SUCCESS, DELETE_CITY_ERROR} from '../actions/types'

const initialState = {
    fetching: false,
    favouriteCityList: [],
    removeItem: null,
}

const favouritesReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case LOADING_CITY_LIST:
            return Object.assign({}, state, { fetching: true, removeItem:null });
        case RECEIVED_CITY_LIST:
            return Object.assign(
                {},
                state,
                { fetching: false, favouriteCityList: action.data, removeItem:null}
            );
        case CITY_LIST_ERROR:
            return Object.assign(
                {},
                state,
                { fetching: false, favouriteCityList: null, error: action.data, removeItem:null}
            );
        case DELETE_CITY:
            return Object.assign(
                {},
                state,
                { fetching: false, removeItem:{status:'pending', item:action.data}}
            );
        case DELETE_CITY_SUCCESS:
            return Object.assign(
                {},
                state,
                { 
                    fetching: false, 
                    favouriteCityList: action.data, 
                    removeItem:{status:'success', item:action.data}
                }
            );
        case DELETE_CITY_ERROR:
            return Object.assign(
                {},
                state,
                { fetching: false, removeItem:{status:'error', item:action.data}}
            );
        default: 
            return state 
    }
}

export default favouritesReducer;