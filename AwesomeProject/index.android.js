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

import { Header } from 'react-native-elements';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from './components/views/login';
import Firebase from './components/firebase/firebase';
import Menu from './components/views/MenuBar';
import Home from './components/views/universaltabs';
import User from './components/views/UserProfile';
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
            isOpen: false,
            userLoaded: false,
            initialView: null
        };

        this.getInitialView = this.getInitialView.bind(this);
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
        getInitialView() {
            firebase.auth().onAuthStateChanged((user) => {
                let initialView = user ? "Home" : "Login";
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
                case 'User':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: "User Profile" , style: { color: 'black',fontSize: 20} }}
                                rightComponent={{ icon: 'search', color: 'black' }}
                            />
                            <User navigator={navigator}
                                  uniqueId={route.uniqueId}
                                  {...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'MessageUI':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            //toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: route.name, style: { color: 'black',fontSize: 20} }}
                            />
                            <MessageUI navigator={navigator}
                                           name={route.name}
                                           chatId={route.chatId}
                                           {...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'Home':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: "Home" , style: { color: 'black',fontSize: 20} }}
                                rightComponent={{ icon: 'search', color: 'black' }}
                            />
                            <Home navigator={navigator}
                                    {...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'Messenger':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: "Messenger" , style: { color: 'black',fontSize: 20} }}
                                rightComponent={{ icon: 'search', color: 'black' }}
                            />
                            <Messenger navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'Calendar':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: "Calendar" , style: { color: 'black',fontSize: 20} }}
                                rightComponent={{ icon: 'search', color: 'black' }}
                            />
                            <Calendar navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'UserSearch':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
                            menu={menu}
                        >
                            <Header
                                outerContainerStyles={{ backgroundColor: 'white', height: 55, }}
                                leftComponent={{ icon: 'menu', onPress: () => this.toggle(), color: 'black', }}
                                centerComponent={{ text: "User Search" , style: { color: 'black',fontSize: 20} }}
                                rightComponent={{ icon: 'search', color: 'black' }}
                            />
                            <UserSearch navigator={navigator}{...route.passProps}/>
                        </SideMenu>);
                    break;
                case 'FavoritePetKeeper':
                    return (
                        <SideMenu
                            isOpen={this.state.isOpen}
                            //hiddenMenuOffset={10}
                            toleranceY={5}
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

                <Navigator
                            initialRoute={{id: this.state.initialView}}
                            renderScene={this.renderScene}
                            configureScene={this.configureScene}/>
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