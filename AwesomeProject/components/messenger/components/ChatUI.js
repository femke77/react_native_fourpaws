import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';

import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ChatList from '../components/ChatList'
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';
import Database from '../../firebase/database';
import * as firebase from "firebase"

export default class ChatUI extends Component {
    constructor(props){
        super(props);
    }
    state = {
        scrollViewHeight: 0,
        inputHeight: 0
    };

    async componentDidMount(){
        this.scrollToBottom(false);
    }

    componentDidUpdate() {
        // this.props.user.uid = this.state.uid;
        // this.props.user.name = this.state.fname + ' ' + this.state.lname;
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

    sendMessage = (text, user, chat) => {
        return sendMessage(text, this.props.user, this.props.chat)
    };

    render() {
        return (
            <Screen>
                <KeyboardAwareScrollView ref="scroll"
                                         onLayout={this.onScrollViewLayout}
                                         style={{backgroundColor: 'white'}}>
                    <View style={{
                        marginTop: -9,
                        backgroundColor: 'white'}}>
                        <ChatList {...this.props} navigator={this.props.navigator}/>
                    </View>

                </KeyboardAwareScrollView>
            </Screen>
        )
    }
}