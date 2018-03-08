import React, { Component } from 'react';
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
    Keyboard,
    Button,
    ScrollView



} from 'react-native';

import { Header, Icon, List, ListItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import Tabs from './tabs';
import Profile_Information from './Profile_Information';
import UserPic from './UserPic';
import Mapviews from "./Mapview";
import Calendars from "./calendar";
import FavoritePetKeeper from "./favoritepetkeeper";
import Menu from "./MenuBar"
import * as firebase from "firebase";
import Database from '../firebase/database';
import { Nav, Tab } from 'react-native-simple-tab';






export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            ddress: "",
            city: "",
            state: "",
            zipcode: "",
            contactNumber:""


        };

    }

    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            Database.listenUserName(user.uid, (fname, lname, address, city, state, zipcode, contactNumber)=> {
                this.setState({
                    fname: fname,
                    lname: lname,
                    address: address,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    contactNumber:contactNumber
                })
            });

            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        let first_name = this.state.fname;
        let last_name = this.state.lname;
        let address = this.state.address;
        let city = this.state.city;
        let state = this.state.state;
        let zipcode= this.state.zipcode;
        let contactNumber=this.state.contactNumber;

        return (
<ScrollView>
        <List >


        <ListItem rightIcon={{name: 'create'}}
                  leftIcon={{name: 'person'}}
                  title={first_name}
                  rightTitle='First Name'
                  onPressRightIcon={() => {
                      Alert.alert('Home');
                  } }

        >
        </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'person'}}
                      title={last_name}
                      rightTitle='Last Name'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }

            >
            </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'home'}}
                      title={address}
                      rightTitle='Address'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }

            >
            </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'location-city'}}
                      title={city}
                      rightTitle='City'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }
            >
            </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'explore'}}
                      title={state}
                      rightTitle='State'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }

            >
            </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'flag'}}
                      title={zipcode}
                      rightTitle='Zipcode'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }

            >
            </ListItem>
            <ListItem rightIcon={{name: 'create'}}
                      leftIcon={{name: 'phone'}}
                      title={contactNumber}
                      rightTitle='Phone Number'
                      onPressRightIcon={() => {
                          Alert.alert('Home');
                      } }

            >
            </ListItem>



      </List>
</ScrollView>
        );
 }
}

const styles = StyleSheet.create({
    TextList: {
        fontSize: 15,                            // Take up all screen
        backgroundColor: '#000000',

    }});