import React from 'react';
import { connect } from 'react-redux';
import { View } from '@shoutem/ui';

import MessageList from '../components/MessageList';
import { updateMessagesHeight } from '../actions';

const mapStateToProps = (state) => ({
    messages: state.chatroom.messages,
    isFetching: state.chatroom.meta.isFetching
});

const Messages = connect(mapStateToProps)
    (({ messages, isFetching, dispatch }) => {
    if (isFetching) {
        return (
            <View style={{
                paddingTop: 50,
                paddingBottom: 50
            }}>
            </View>
        )
    }
    else{
        return <MessageList messages={messages}
                            style={{minHeight: 80}}
                            onLayout={(event) => dispatch(updateMessagesHeight(event))} />
    }
});

export default Messages;