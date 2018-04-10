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
import Menu from './components/views/MenuBar';
import Home from './components/views/universaltabs';
import Signup from './components/views/signup';
import Signup2 from './components/views/signupaddress';
import Upload from './components/tools/upload';
import Calendar from './components/views/calendar';
import UserSearch from './components/views/Mapview';
import FavoritePetKeeper from './components/views/favoritepetkeeper';
import Messenger from './components/messenger/Messenger';
import MessageUI from './components/messenger/Messenger2';
import * as firebase from 'firebase';

import SideMenu from 'react-native-side-menu';

export default class AwesomeProject extends Component {


    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        if (!firebase.apps.length) {
            Firebase.initialise();
        }
        this.getInitialView();

        this.state = {
            userLoaded: false,
            initialView: null
        };

        this.getInitialView = this.getInitialView.bind(this);
    }

        getInitialView() {
            firebase.auth().onAuthStateChanged((user) => {
                let initialView = user ? "Messenger" : "Login";
                this.setState({
                    userLoaded: true,
                    initialView: initialView
                })
            });
        }

        renderScene = (route, navigator) => {
            const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={navigator}/>;

            _navigator = navigator;
            switch (route.id) {
                case 'Login':
                    return (<Login navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Signup':
                    return (<Signup navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Signup2':
                    return (<Signup2 navigator={navigator}{...route.passProps}/>);
                    break;
                case 'Upload':
                    return (<Upload navigator={navigator}{...route.passProps}/>);
                    break;
                case 'MessageUI':
                    return (<MessageUI navigator={navigator}
                                       chatId={route.chatId}
                                       {...route.passProps}/>);
                    break;
                case 'Home':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            hiddenMenuOffset={10}
                            toleranceY={10}
                            menu={menu}
                        >
                            <Home navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'Messenger':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            hiddenMenuOffset={10}
                            toleranceY={10}
                            menu={menu}
                        >
                            <Messenger navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'Calendar':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            hiddenMenuOffset={10}
                            toleranceY={10}
                            menu={menu}
                        >
                            <Calendar navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'UserSearch':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            hiddenMenuOffset={10}
                            toleranceY={10}
                            menu={menu}
                        >
                            <UserSearch navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'FavoritePetKeeper':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            hiddenMenuOffset={10}
                            toleranceY={10}
                            menu={menu}
                        >
                            <FavoritePetKeeper navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
            }
        };

    render() {
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



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

if (window.document) {
    AppRegistry.runApplication('AwesomeProject', {
        initialProps: {},
        rootTag: document.getElementById('react-root')
    });
}