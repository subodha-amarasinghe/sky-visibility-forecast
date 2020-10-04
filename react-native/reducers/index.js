import { combineReducers } from "redux";
import authReducer from './authReducer';
import citySavingReducer from "./citySavingReducer";
import cityWeatherReducer from "./cityWeatherReducer";
import favouritesReducer from './favouritesReducer'
const rootReducer = combineReducers({
    auth: authReducer,
    favourite:favouritesReducer,
    cityWeather: cityWeatherReducer,
    citySaving: citySavingReducer
});
export default rootReducer;
