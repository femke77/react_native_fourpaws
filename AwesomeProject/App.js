/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
//Testing 1

import Universaltabs from './components/views/universaltabs';
import Login from './components/views/login';
import Mapviews from './components/views/Mapview';
import Profile_Information from './components/views/Profile_Information';
import UserPic from "./components/views/UserPic";

import List from "./components/views/ListView";
import AwesomeProject from "./index.android";



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
//testing 101
export default class App extends Component {
  render() {
    return (
      <AwesomeProject/>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
