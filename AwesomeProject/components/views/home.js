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
    Button

} from 'react-native';
import PropTypes from 'prop-types';
import Universaltabs from '/Users/Mac/IdeaProjects/react_native_fourpaws_786/AwesomeProject/components/views/universaltabs.js';



import Tabs from '../styles/tabs';
import * as firebase from "firebase";
import Login from './login.js';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {}


    }

    logout() {

        this.props.navigator.push({ id: 'Login'});
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });

    }



    render() {

        return (


            <View style={styles.container13}>
                <Universaltabs/>
            </View>
        );


    }
}
const styles = StyleSheet.create({
// App container
    container13: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#383838',         // Background color
    },
// Tab content container
    content13: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#d91e18',         // Darker background for content area
    },
// Content header
    header13: {
        margin: 10,                         // Add margin
        color: '#ffec01',                   // White color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 26,                       // Bigger font size
    },
// Content text
    text13: {
        marginHorizontal: 20,               // Add horizontal margin
        color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    },



});