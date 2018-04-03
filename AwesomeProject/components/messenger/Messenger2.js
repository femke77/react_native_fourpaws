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

const InitializeChat = connect(
    (state) => ({
        authorized: state.user.authorized
    }))(({ authorized, dispatch }) => {
        dispatch(userInformation());
        return (<MessageUI />);
});

class Messenger extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <InitializeChat {...this.props} navigator = {this.props.navigator} />
            </Provider>
        );
    }
}

export default Messenger;