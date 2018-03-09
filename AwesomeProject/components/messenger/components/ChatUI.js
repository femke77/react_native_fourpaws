import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';

import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';

import * as firebase from "firebase"

const mapStateToProps = (state) => ({
    chat: state.chatroom,
    chatHeight: state.chatroom.meta.height,
    user: state.user,
    userId: firebase.auth().currentUser.uid
});

class ChatUI extends Component {
    state = {
        scrollViewHeight: 0,
        inputHeight: 0
    };
    componentDidMount() {
        this.scrollToBottom(false);
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    onScrollViewLayout = (event) => {
        const layout = event.nativeEvent.layout;

        this.setState({
            scrollViewHeight: layout.height
        });
    };
    onInputLayout = (event) => {
        const layout = event.nativeEvent.layout;

        this.setState({
            inputHeight: layout.height
        });
    };
    scrollToBottom(animate = true) {
        const { scrollViewHeight, inputHeight } = this.state,
            { chatHeight } = this.props;

        const scrollTo = chatHeight - scrollViewHeight + inputHeight;

        if (scrollTo > 0) {
            this.refs.scroll.scrollToPosition(0, scrollTo, animate)
        }
    }
    _scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }

    sendMessage = (text, user, usreId, chat) => {
        return sendMessage(text, this.props.user, this.props.userId,this.props.chat)
    };

    render() {
        return (
            <Screen>
                <Title styleName="h-center" style={{padding: 10}}>
                    Molly Jenkins
                </Title>
                <KeyboardAwareScrollView ref="scroll"
                                         onLayout={this.onScrollViewLayout}>
                    <Messages/>
                </KeyboardAwareScrollView>
                    <Input footer={height=100}
                           onLayout={this.onInputLayout}
                           // onFocus={this._scrollToInput.bind(this)}
                           submitAction={this.sendMessage}
                           ref="input"
                           placeholder="Message ..." />
            </Screen>
        )
    }
}

export default connect(mapStateToProps)(ChatUI);