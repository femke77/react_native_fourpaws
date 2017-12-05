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

import Universaltabs from './TestingComponents/universaltabs';
import Login from './components/views/login';
import Mapviews from './TestingComponents/MapComponents/Mapview';
import Profile_Information from './TestingComponents/Profile_Information';
import UserPic from "./TestingComponents/UserPic";
import OffCanvasReveal from "./TestingComponents/Menu";
import List from "./TestingComponents/ListView";



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
      <Universaltabs/>
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
