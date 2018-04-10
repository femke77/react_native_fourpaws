import { combineReducers } from 'redux';

import messages from './messages';

const initialState = {
    id: null,
    messages: null,
    isFetching: false,
    lastFetched: null,
    height: 0
};

const meta = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHAT_ID':
            return Object.assign({}, state, {
                id: action.id
            });
        case 'CLEAR_CHAT':
            return Object.assign({}, state, {
                messages: []
            });
        case 'START_FETCHING_MESSAGES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVED_MESSAGES':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
};

const chatroom = combineReducers({
    messages,
    meta
});

export default chatroom;