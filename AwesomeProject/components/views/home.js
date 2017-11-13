import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,


} from 'react-native';

export default class Home extends Component {

    async logout(){
        try{
            await
                firebase.auth().signOut();
        } catch (error){
            console.log(error);
        }
    }


    render() {
        return (
            <Text>Home Page</Text>
        )
    }
}