import Firebase from '../firebase';
import * as firebase from "firebase";
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

export const sendMessage = (text, user, userId, chat) => {
    return function (dispatch) {
        let msg = {
            text: text,
            time: Date.now(),
            author: {
                userId: userId,
                uid: user.uid,
                name: user.name,
                avatar: user.avatar
            }
        };

        let userMobilePath = "/messages/" + userId +'/'+ chat.id;
        const newMsgRef = Firebase.database()
            .ref(userMobilePath)
            .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = (user, userId, chat) => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        let userMobilePath = "/messages/" + userId +'/'+ chat.id;
        Firebase.database()
            .ref(userMobilePath)
            .orderByKey()
            .limitToLast(20)
            .on('value', (snapshot) => {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];

                    dispatch(receiveMessages(messages))
                }, 0);
            });
    }
};

export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
};

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
};



//
// User actions
//

const startChatting = (user) = function (dispatch) {
    dispatch(fetchMessages(user));

    FCM.requestPermissions();
    FCM.getFCMToken()
        .then(token => {
            console.log(token)
        });
    FCM.subscribeToTopic('secret-chatroom');

    FCM.on(FCMEvent.Notification, async (notif) => {
        console.log(notif);

        if (Platform.OS === 'ios') {
            switch (notif._notificationType) {
                case NotificationType.Remote:
                    notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                    break;
                case NotificationType.NotificationResponse:
                    notif.finish();
                    break;
                case NotificationType.WillPresent:
                    notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                    break;
            }
        }
    });

    FCM.on(FCMEvent.RefreshToken, token => {
        console.log(token);
    });
};