import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ChatUI from '../messenger/components/ChatUI';
import rootReducer from '../messenger/reducers';
import {fetchMessages , checkUserExists} from '../messenger/actions';


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);

const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized
    }))(({ authorized, dispatch }) => {
    if (authorized) {
        return (<ChatUI />);
    }else{
        dispatch(checkUserExists());
        return (<ChatUI />);
    }
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <LoginOrChat  />
            </Provider>
        );
    }
}

export default App;