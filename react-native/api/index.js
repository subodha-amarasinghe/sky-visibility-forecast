import Axios from 'axios';
import config from '../config'
export const userSignIn = async (formdata) => {
    return await Axios.post(`${config.API_URL}/login`, formdata, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data
    }).catch((e) => {
        return e
    })
};

export const userSignOut = async () => {
    return await Axios.post(`${config.API_URL}/logout`).then((response) => {
        return response.data
    }).catch((e) => {
        return e
    })
};

export const userSignUp = async (formdata) => {
    return await Axios.post(`${config.API_URL}/register`, formdata, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data
    }).catch((e) => {
        return e
    })
};

export const fetchCityList = async (userid) => {
    return await Axios.get(`${config.API_URL}/favourites/${userid}`).then((response) => {
        return response.data
    }).catch((e) => {
        return { error: e }
    })
}

export const fetchCityWeather = async (cityname) => {
    return await Axios.get(`${config.API_URL}/weather/${cityname}`).then((response) => {
        return response.data
    }).catch((e) => {
        return { error: e }
    })
}

export const addCity = async (postData) => {
    return await Axios.post(`${config.API_URL}/favourites`, postData, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data
    }).catch((e) => {
        return e
    })
}

export const deleteCity = async(id) => {
    return await Axios.delete(`${config.API_URL}/favourites/${id}`).then((response) => {
        return response.data
    }).catch((e) => {
        return { error: e }
    })
}

