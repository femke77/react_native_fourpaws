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

import Signup from './components/views/signup';

export default class AwesomeProject extends Component {



    render() {


        return (

            <Navigator initialRoute={{id: 'Signup'}}
                renderScene={this.navigatorRenderScene}/>
        );
    }

    navigatorRenderScene(route, navigator){
        _navigator = navigator;
        switch (route.id) {
            case 'Signup':
                return (<Signup navigator={navigator}/>);


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