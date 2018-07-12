import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}


export default function(state = initialState, action) {     // state is set to initialState defined above
    switch (action.type) {  // check the type of action
        case GET_ITEMS:
            return {
                ...state,    // returns whatever is in the state
                items: action.payload,   // update the items with the action payload
                loading: false          // set loading state back to false
            };
    
        // remove item from the items list in the UI (delete request should be made to the server)
        case DELETE_ITEM:
            return {
                ...state,    // returns whatever is in the state
                items: state.items.filter(item => item._id !== action.payload)   // compare to action payload
            };

        case ADD_ITEM:
            return {
                ...state,    // returns whatever is in the state currently. Note: you cant directly mutate a state
                items: [action.payload, ...state.items]   // add new item to list of items
            };

        case ITEMS_LOADING:
            return {
                ...state,    // returns whatever is in the state currently. Note: you cant directly mutate a state
                loading: true   // toggle the loading state from false to true
            };

        default:
            return state;
    }
}