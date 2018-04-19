import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../messenger/reducers';
import {fetchMessages , userInformation} from '../messenger/actions';
import ChatUI from './components/ChatUI';
import MessageUI from './components/MessageUI';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

const InitializeChat =
    connect((state) => ({}))
    (({ navigator, name, chatId , dispatch }) => {
        dispatch(userInformation(chatId));
        return (<MessageUI
            navigator = {navigator}
            name = {name}
        />);
});

class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            chatId: this.props.chatId
        }
    }

    render() {
        return (
            <Provider store={store}>
                <InitializeChat {...this.props}
                                navigator = {this.props.navigator}
                                name = {this.state.name}
                                chatId = {this.state.chatId}/>
            </Provider>
        );
    }
}

export default Messenger;