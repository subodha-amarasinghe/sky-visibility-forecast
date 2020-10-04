import { LOADING_CITY_WEATHER, RECEIVED_CITY_WEATHER, CITY_WEATHER_ERROR } from './types';

import { fetchCityWeather } from '../api';

export const getCityWeather = (city_name) => {
    return dispatch => {
        dispatch({
            type: LOADING_CITY_WEATHER
        });

        fetchCityWeather(city_name)
            .then(data => {
                dispatch({
                    type: RECEIVED_CITY_WEATHER,
                    data: data
                });
            })
            .catch(error => {
                dispatch({
                    type: CITY_WEATHER_ERROR,
                    error: error
                });
            });
    };
};
