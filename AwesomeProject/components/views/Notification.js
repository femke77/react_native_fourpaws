import React, { Component } from 'react';
import { Text,View, StyleSheet, Picker,AppState,Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';
export default class notification extends Component {
    constructor(props){
        super(props);

        this.handleAppStateChange=this.handleAppStateChange.bind(this);
        this.state={
            seconds: 10000,
            messages:"Hi, this is from fourpaws",
            titles: "Fourpaws",
            color: "black",
        };
    }
    componentDidMount(){
        AppState.addEventListener('change',this.handleAppStateChange);
    }
    componentWillUnmount(){
        AppState.removeEventListener('change',this.handleAppStateChange);
    }
    handleAppStateChange(appState){
        if(appState==='background'){
            PushNotification.localNotificationSchedule({
                largeIcon: "ic_launcher",
                color: this.state.color,
                title: this.state.titles,
                message: this.state.messages, // (required)
                date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
            });
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    select type of notification.
                </Text>

                <Button
                    onPress={() => {
                        this.state.titles="You have a message" ;
                        this.state.messages="Hi all, how are you" ;
                        this.state.color="red";
                        this.state.seconds=5;
                    }}
                    title="message"
                    //color="#841584"
                    //accessibilityLabel="pick"
                />




                <Button
                    onPress={() => {
                        this.state.titles="You have a appointment" ;
                        this.state.messages="appointment1" ;
                        this.state.color="blue";
                        this.state.seconds=5;
                    }}
                    title="appointment"
                    //color="#841584"
                    //accessibilityLabel="pick"
                />
                <PushController/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    picker:{
        width:100,
    },
});