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
    ToastAndroid


} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {Navigator} from 'react-native-deprecated-custom-components';
import Database from '../firebase/database';
import * as firebase from "firebase";
import { Header, Icon, List, ListItem, Overlay } from 'react-native-elements';


export default class Edit extends Component {

    constructor(props){
        super(props);

        this.state ={
            address: "",

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

    edittab(){
        if (this.state.address ) {
            Database.setUser2(this.state.uid, this.state.address)
            //this.props.navigator.push({id: 'Home'}); Need to add function of saving the data and going to back
        } else {
            ToastAndroid.show('No changes made',ToastAndroid.SHORT);
        }

    }

    _

    render() {
        let first_name = this.state.fname;
        let last_name = this.state.lname;
        let address = this.state.address;
        let city = this.state.city;
        let state = this.state.state;
        let zipcode= this.state.zipcode;
        let contactNumber=this.state.contactNumber;

        return (
            <Overlay
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <Text>Hello from Overlay!</Text>
            </Overlay>
        );}
}