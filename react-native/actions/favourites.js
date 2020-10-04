import {
    LOADING_CITY_LIST,
    RECEIVED_CITY_LIST,
    CITY_LIST_ERROR,
    SAVING_CITY,
    SAVING_CITY_SUCCESS,
    SAVING_CITY_ERROR,
    DELETE_CITY,
    DELETE_CITY_SUCCESS,
    DELETE_CITY_ERROR,
} from './types';
import { fetchCityList, addCity, deleteCity } from '../api';

export const getFavouriteCityList = (user_id) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_CITY_LIST
        });

        fetchCityList(user_id)
            .then(data => {
                dispatch({
                    type: RECEIVED_CITY_LIST,
                    data: data.data
                });
            })
            .catch(error => {
                dispatch({
                    type: CITY_LIST_ERROR,
                    error: error
                });
            });
    };
};

export const addFavouriteCity = (city) => {
    return (dispatch, getState) => {
        dispatch({
            type: SAVING_CITY
        });

        addCity({
            userId: getState().auth.user.userData.id,
            cityName: city.name,
            temperature: parseInt(city.main.temp - 273.15),
            clouds: city.clouds.all,
            icon: city.weather[0]['icon'],
        })
            .then(data => {
                dispatch({
                    type: SAVING_CITY_SUCCESS,
                    data: data
                });
            })
            .catch(error => {
                dispatch({
                    type: DELETE_CITY_ERROR,
                    error: error
                });
            });
    };
};

export const deleteFavouriteCity = (id) => {
    console.log("id===>>", id)
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_CITY
        });

        deleteCity(id)
            .then(data => {
                dispatch({
                    type: DELETE_CITY_SUCCESS,
                    data: getState().favourite.favouriteCityList.filter(item => item._id!==id)
                });
            })
            .catch(error => {
                dispatch({
                    type: SAVING_CITY_ERROR,
                    error: error
                });
            });
    };
};

