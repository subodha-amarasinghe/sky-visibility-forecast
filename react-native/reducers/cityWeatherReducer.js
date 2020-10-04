import {LOADING_CITY_WEATHER, RECEIVED_CITY_WEATHER, CITY_WEATHER_ERROR} from '../actions/types'

const initialState = {
    fetching: false,
    weather: null,
}

const cityWeatherReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case LOADING_CITY_WEATHER:
            return Object.assign({}, state, { fetching: true });
        case RECEIVED_CITY_WEATHER:
            return Object.assign(
                {},
                state,
                { fetching: false, weather: action.data}
            );
        case CITY_WEATHER_ERROR:
            return Object.assign(
                {},
                state,
                { fetching: false, weather: null, error: action.data}
            );
        default: 
            return state 
    }
}

export default cityWeatherReducer;