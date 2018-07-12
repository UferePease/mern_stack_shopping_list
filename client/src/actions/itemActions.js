import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// add a dispatch
export const getItems = () => dispatch => {
    // call setItemsLoading by dispatch to set loading to true
    dispatch(setItemsLoading());

    // make a get request to the api
    axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,     // return this action to the reducer
            payload: res.data
        }));
}

export const addItem = (item) => dispatch => {
    // make a POST request to the api
    axios
        .post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,     // return this action to the reducer
            payload: res.data
        }));
}

export const deleteItem = (id) => dispatch => {
    // make a DELETE request to the api
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,     // return this action to the reducer
            payload: id            // dispatch id to reducer
        }));
}

export const setItemsLoading = () => {
    return {    // return this action to the reducer
        type: ITEMS_LOADING
    };
}