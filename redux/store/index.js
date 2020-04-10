import {combineReducers, createStore} from 'redux';
import ParcelsReducer from '../reducers/ParcelsReducer';

const store = createStore(
    combineReducers({
        parcels: ParcelsReducer
    })
);

export default store;