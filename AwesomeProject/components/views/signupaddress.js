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

import Database from '../firebase/database';
import * as firebase from "firebase";


export default class Signupaddress extends Component {

    constructor(props){
        super(props);
        console.ignoredYellowBox = [  //related to timeout on auth token of 60min, known issue
            'Setting a timer'
        ];
        this.state ={
            address: null,
            city: null,
            state: null,
            zipcode: null
        };

        this.navHome = this.navHome.bind(this);
        this.goBack = this.goBack.bind(this);
        this.checkZipLen = this.checkZipLen.bind(this);
    }

    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid,

            });
        } catch (error) {
            alert(error);
        }
    }

    navHome(){
        if (this.state.zipcode && this.state.address && this.state.state && this.state.city) {
            Database.setUser2(this.state.uid, this.state.address, this.state.city, this.state.state, this.state.zipcode);
            this.props.navigator.push({id: 'Home'});
            dismissKeyboard()
        } else {
            ToastAndroid.show('Fields cannot be blank',ToastAndroid.SHORT);
        }

    }

    goBack(){
        this.props.navigator.push({id:'Signup'});
        dismissKeyboard();
    }

    checkZipLen(zipcode){

        if (zipcode.length  !== 5){
            alert("Zipcode must be 5 numbers")
        } else {
            this.navHome();
        }
    }

    render(){
        const resizeMode = 'cover';
        return (
            <KeyboardAvoidingView /*behavior="padding"*/ style={styles.TextCSS1}>

                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />

                <Image
                    style={{
                        background: 'transparent',
                        backgroundColor: '#d1d1d1',
                        flex: 1,
                        resizeMode,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                    }}
                    source={require('../images/cat.jpeg')} // background photo
                />

                <Image
                    style={{
                        background: 'transparent',
                        //backgroundColor: 'transparent',
                        //flex: -1,
                        //position: 'absolute',
                        //justifyContent: 'center',

                        //marginTop: "5%",
                        //marginBottom: "5%",
                        //justifyContent: 'center',
                        //alignItems: 'center',
                        width: 120,
                        height: 120,
                        //paddingVertical: 50
                    }}

                    source={require('../images/FourPaws.png')} // logo
                />


                <Text style={styles.welcome}>
                    Sign Up
                </Text>

                <TextInput
                    placeholder=" Address"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={(address) => this.setState({address})}

                />

                <TextInput
                    placeholder="City"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={(city) => this.setState({city})}
                />
                <TextInput
                    placeholder="State"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={(state) => this.setState({state})}
                />



                <TextInput
                    placeholder="Zip Code"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={5}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={( zipcode) => this.setState({ zipcode})}
                />


                <View style={{
                    //flex: -1,
                    height: 25,
                    flexDirection: 'row',
                    //justifyContent: 'space-between'
                }}>
                    <View>
                        <TouchableOpacity style= {styles.button}>
                            <Text
                                style= {styles.buttonText}
                                onPress={()=> this.goBack()}>
                                Previous
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style= {styles.button2}>
                            <Text
                                style= {styles.buttonText}
                                onPress={()=> this.checkZipLen(this.state.zipcode)}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.bottomtext}>
                    Copyright © 2017 Four Paws
                </Text>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerKeyB:{
        padding:20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: '5%',
        color: "white",
        //textDecorationLine: 'underline'
    },
    input:{
        height: 40,
        backgroundColor: "black",
        marginBottom: 20,
    },

    SINGUP: {
        fontSize: 45,
        textAlign: 'center',
        margin: 10,
        color: "red",
        textDecorationLine: 'underline'
    },
    //Copyright
    bottomtext: {
        fontSize: 8,
        textAlign: 'center',
        //marginBottom: '1%',
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: '1%',
        paddingVertical:0
    },
    //Forgot username
    Usernametext: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -18,
        paddingVertical:0
    },
    //Forgot password
    passwordFtext: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -18,
        paddingVertical:0
    },
    //Forgot password
    SignIntext: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        //position: 'absolute',
        justifyContent: 'flex-end',
        // bottom: -50,
        // right: -20,
        // paddingVertical:0
    },
    SignIntextbox: {
        //margin: 10,
        // position: 'absolute',
        justifyContent: 'center',
        // bottom: -50,
        // right: -140,
        // paddingVertical:0,
    },
    SignIntextboxtext:{
        fontSize: 16,
        color: "#2095d2",
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    TextCSS1: {
        flex: 1,
        //fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        //  height: 1,
        //  width: 1 ,
        margin: 0.07 ,
        padding: 0 ,
        backgroundColor: "transparent"
    },

    imageStyle: {
        backgroundColor: '#ccc',
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',

    },

    imageStyle2: {
        backgroundColor: '#ccc',
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '50%',
        height: '50%',
        justifyContent: 'flex-end',
    },

    container2: {
        backgroundColor: 'white',
    },

    titleStyle: {
        fontSize: 16,
    },

    container3 : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },

    inputBox: {
        //marginHorizontal: '100%',
        //textAlign: 'left',
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        height: 34,
        width: 120,
        backgroundColor:'#2095d2',
        borderRadius: 10,
        marginHorizontal: 5,
        paddingVertical: 6
    },
    button2: {
        height: 34,
        width: 120,
        backgroundColor:'#BE3A31',
        borderRadius: 10,
        marginHorizontal: 5,
        paddingVertical: 6
    },
    topText: {
        fontSize:16,
        fontWeight:'400',
        color:'black',
        textAlign:'center',
        flex: -100,

    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center',
        flex: -100,

    }
});
