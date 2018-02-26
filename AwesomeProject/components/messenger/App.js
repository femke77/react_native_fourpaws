import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ChatUI from '../messenger/components/ChatUI';
import rootReducer from '../messenger/reducers';
import { fetchMessages, checkUserExists } from '../messenger/actions';


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ChatUI />
            </Provider>
        );
    }
}

export default App;