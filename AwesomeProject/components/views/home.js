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

    constructor(props){
        super(props);

        this.state = {


        }

        this.logout = this.logout.bind(this)
    }

    async logout() {
        try {
            await firebase.auth().signOut();
            this.props.navigator.push({
                name: "Login"
            })
        } catch (error) {
            console.log(error);
        }

    }


    render() {
        return (
            <Text>Home page - nothing here yet!!</Text>
        )
    }
}