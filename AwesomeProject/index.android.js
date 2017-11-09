/**
 fourpaws
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
    KeyboardAvoidingView

} from 'react-native';

import * as firebase from 'firebase';
import Firebase from "./components/firebase/firebase";

if (!firebase.apps.length) {
    Firebase.initialise();
}

async function signup(email, pass){
    try{
        await firebase.auth().createUserWithEmailAndPassword(email,pass);
        console.log("Account created");
    } catch (error){
        console.log(error.toString())
    }
}

async function logout(){
    try{
        await
            firebase.auth().signOut();
    } catch (error){
        console.log(error);
    }
}

export default class AwesomeProject extends Component {


    render() {
        const resizeMode = 'cover';
        return (

            /*<KeyboardAvoidingView beha= "padding"
                style={styles.containerKeyB}
            >*/

            <KeyboardAvoidingView /*behavior="padding"*/ style={styles.TextCSS1}>

                <StatusBar
                    backgroundColor="red"
                    barStyle="light-content"
                />

                <Image
                    style={{backgroundColor: '#ccc',
                        flex: 1,
                        resizeMode,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                    }}
                    source={{ uri: 'https://fourpawlinks.com/wp-content/uploads/2017/10/qtq50-2cmvAT-1024x769.jpeg'}}
                />

                <Image
                    style={{backgroundColor: 'transparent',
                        flex: -1,
                        position: 'absolute',
                        width: 170,
                        height: 100,
                        justifyContent: 'flex-end',
                        top: 100,
                        paddingVertical:50

                    }}
                    source={{ uri: 'https://fourpawlinks.com/wp-content/uploads/2017/10/Untitled-1-1024x655.png' }}
                />

                <Text style={styles.welcome}>

                    Welcome
                </Text>
                <TextInput
                    placeholder=" Username or Email"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}

                />
                <TouchableOpacity>
                    <Text style= {styles.Usernametext}> Forgot Username?</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                />
                <TouchableOpacity>
                    <Text style= {styles.Usernametext}> Forgot Password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.button}>
                    <Text style= {styles.buttonText}> LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style= {styles.SignUptext}> Not Registered Yet?</Text>
                    <Text style= {styles.SignUptextUnderline}>
                        Sign Up Here
                    </Text>
                </TouchableOpacity>

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

    input:{
        height: 40,
        backgroundColor: "black",
        marginBottom: 20,
    },

    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        color: "#000000",
        textDecorationLine: 'underline'
    },
    //Copyright
    bottomtext: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 20,
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
    SignUptext: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -120,
        right: -30,
        paddingVertical:0
    },
    SignUptextUnderline: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "blue",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -120,
        right: -150,
        paddingVertical:0,
        textDecorationLine: 'underline'
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
        width:300,
        height: 50,
        backgroundColor:'black',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:150,
        backgroundColor:'#c84d55',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
        flex: -1,

    }


});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

if (window.document) {
    AppRegistry.runApplication('AwesomeProject', {
        initialProps: {},
        rootTag: document.getElementById('react-root')
    });
}