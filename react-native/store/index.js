/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware  } from 'redux';
import ReduxThunk  from 'redux-thunk';
import rootReducer from '../reducers/';

const configureStore = () => createStore(
    rootReducer,
    applyMiddleware(ReduxThunk )
);

export default configureStore