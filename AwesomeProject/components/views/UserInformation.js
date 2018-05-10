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
    ScrollView,
    Alert



} from 'react-native';

import { Header, Icon, List, ListItem, FormLabel } from 'react-native-elements';

import * as firebase from "firebase";
import Database from '../firebase/database';
import Modal from "react-native-modal";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Nav, Tab } from 'react-native-simple-tab';


export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            address: "",
            city: "",
            state: "",
            zipcode: "",
            contactNumber: ""
        };
    }
    state = {
        isModalVisible: false
    };
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            Database.listenUserInfo(user.uid, (data)=> {
                this.setState({
                    fname: data.fname,
                    lname: data.lname,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    zipcode: data.zipcode,
                    contactNumber: data.contactNumber
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
            <View>
                <ScrollView >
                    <View style={{marginTop:-20}}>
                    <List>
                        <ListItem
                            rightIcon={{name: 'create'}}
                            leftIcon={{name: 'person'}}
                            title={first_name}
                            rightTitle='First Name'
                            onPressRightIcon={this._toggleModal }
                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'person'}}
                            title={last_name}
                            rightTitle='Last Name'

                            chevronColor="white"

                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'home'}}
                            title={address}
                            rightTitle='Address'

                            chevronColor="white"

                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'location-city'}}
                            title={city}
                            rightTitle='City'

                            chevronColor="white"
                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'explore'}}
                            title={state}
                            rightTitle='State'

                            chevronColor="white"

                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'flag'}}
                            title={zipcode}
                            rightTitle='Zipcode'

                            chevronColor="white"

                        >
                        </ListItem>
                        <ListItem
                            leftIcon={{name: 'phone'}}
                            title={contactNumber}
                            rightTitle='Phone Number'

                            chevronColor="white"

                        >
                        </ListItem>
                    </List>
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}
                       style={styles.Modelcotainer}
                       backdropOpacity={0.3}
                       animationIn="zoomInDown"
                       animationOut="zoomOutUp"
                       animationInTiming={1000}
                       animationOutTiming={1000}
                       backdropTransitionInTiming={1000}
                       backdropTransitionOutTiming={1000}
                       onBackdropPress={() => this.setState({ isVisible: false })}


                >
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <FormLabel labelStyle={styles.FormContainer}>First Name </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={first_name}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(first_name) => this.setState({first_name})}

                            />
                            <FormLabel labelStyle={styles.FormContainer}>Last Name </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={last_name}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(last_name) => this.setState({last_name})}

                            />
                            <FormLabel labelStyle={styles.FormContainer}>Address </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                //placeholder={address}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(address) => this.setState({address})}

                            />
                            <FormLabel labelStyle={styles.FormContainer}>City </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={city}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(city) => this.setState({city})}

                            />
                            <FormLabel labelStyle={styles.FormContainer}>State </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={state}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(state) => this.setState({state})}

                            />
                            <FormLabel labelStyle={styles.FormContainer}>Zipcode </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={zipcode}
                                keyboardType="numeric"
                                maxLength={5}
                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(zipcode) => this.setState({zipcode})}

                            />
                            <FormLabel
                                labelStyle={styles.FormContainer}>Phone Number </FormLabel>
                            <TextInput
                                style={styles.inputBox}
                                placeholder={contactNumber}
                                keyboardType="numeric"

                                placeholderTextColor= "black"
                                returnKeyType="next"
                                underlineColorAndroid={'transparent'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor= '#2095d2'
                                onChangeText={(contactNumber) => this.setState({contactNumber})}

                            />
                            <View>
                                <Grid>
                                    <Col>
                                        <Button onPress={this.Saveinfo}
                                                title={"Save"}
                                                buttonStyle={styles.FormButton}
                                                leftIcon={{name:'check'}}
                                                color={'#2095d2'}
                                        />
                                    </Col>
                                    <Col>
                                        <Button onPress={this._toggleModal}
                                                title={"Cancel"}
                                                buttonStyle={styles.FormButton}
                                                leftIcon={{name:'clear'}}
                                                color={'#BE3A31'}
                                        />
                                    </Col>
                                </Grid>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    TextList: {
        fontSize: 15,                            // Take up all screen
        backgroundColor: '#000000',
    },

    Modelcotainer: {

        backgroundColor: "white",
        padding:22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: "black",
        width: 325,
    },

    inputBox: {
        width:270,
        height: 50,
        //backgroundColor:'#2095d2',

        borderWidth: 0.5,
        borderColor: "black",
        paddingBottom:16,
        fontSize:16,
        color:'black',
        marginVertical: 5
    },
    FormContainer: {
        width:170,
        paddingHorizontal:-56,
        paddingLeft: -15,
        height: 20,
        //backgroundColor: "black",
    },
    FormButton:{
        width:100,
        height: 30,
        padding: 10,
        marginVertical:5,
    },

    });