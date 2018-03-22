import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../messenger/reducers';
import {fetchMessages , userInformation} from '../messenger/actions';
import ChatUI from './components/ChatUI';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

const InitializeOrChat = connect(
    (state) => ({
        authorized: state.user.authorized
    }))(({ authorized, dispatch }) => {
        dispatch(userInformation());
        return (<ChatUI />);
});

class Messenger extends Component {
    render() {
        return (
            <Provider store={store}>
                <InitializeOrChat  />
            </Provider>
        );
    }
}

export default Messenger;