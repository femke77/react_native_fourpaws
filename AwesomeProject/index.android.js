/**
 FourPaws Project
 Firebase SDK 3.1
 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,

} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import Login from './components/views/login';

import Firebase from './components/firebase/firebase';
import Home from './components/views/home';

import PropTypes from 'prop-types';


import Signup from './components/views/signup';

import Upload from './components/tools/upload';



export default class AwesomeProject extends Component {


    constructor(props) {
        super(props);

        //for hot reloading: check if firebase is already initialized
        if (!firebase.apps.length) {
            Firebase.initialise();
        }
        this.getInitialView();


        getInitialView()
        {
            firebase.auth().onAuthStateChanged((user) => {
                let initialView = user ? "Home" : "Upload";
                this.setState({
                    userLoaded: true,
                    initialView: initialView
                })
            });
        }

        renderScene = (route, navigator) => {
            _navigator = navigator;
            switch (route.id) {
                case 'Login':
                    return (<Login navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Home':
                    return (<Home navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Signup':
                    return (<Signup navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Upload':
                    return (<Upload navigator={{navigator}}/>);
                    break;
            }
        }

        render()
        {

            if (this.state.userLoaded) {
                return (


                    <Navigator initialRoute={{id: this.state.initialView}}
                               renderScene={this.renderScene}/>
                );
            } else {
                return null;
            }
        }
    }

}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

if (window.document) {
    AppRegistry.runApplication('AwesomeProject', {
        initialProps: {},
        rootTag: document.getElementById('react-root')
    });
}