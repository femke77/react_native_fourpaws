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


} from 'react-native';

import * as firebase from "firebase";
import Firebase from '../firebase/firebase';

export default class Signup extends Component {



    render(){
        const resizeMode = 'cover';
        return (
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
                        top: 30,
                        right: 100,
                        paddingVertical:50

                    }}
                    source={{ uri: 'https://fourpawlinks.com/wp-content/uploads/2017/10/Untitled-1-1024x655.png' }}
                />


                <TextInput
                    placeholder=" Username or Email"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={(email) => this.setState({email})}

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
                    onChangeText={(password) => this.setState({password})}
                />


                <TextInput
                    placeholder="address"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"

                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={(address) => this.setState({address})}
                />
                <TextInput
                    placeholder="Security question"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"

                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={(Securityquestion) => this.setState({Securityquestion})}
                />
                <TextInput
                    placeholder=" Contact number"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"

                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={( Contactnumber) => this.setState({ Contactnumber})}
                />



                <TouchableOpacity style= {styles.button}>
                    <Text style= {styles.buttonText}> SinUp</Text>
                </TouchableOpacity>

                <View>
                    <Text style= {styles.SignIntext}> Have account?</Text>
                    <TouchableOpacity style= {styles.SignIntextbox} >
                        <Text style= {styles.SignIntextboxtext}>Login Here</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottomtext}>

                        Copyright © 2017 Four Paws
                    </Text>
                </View>





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

    SINGUP: {
        fontSize: 45,
        textAlign: 'center',
        margin: 10,
        color: "red",
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
        bottom: -100,
        right: -110,
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -50,
        right: -20,
        paddingVertical:0
    },
    SignIntextbox: {
        margin: 10,
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: -50,
        right: -140,
        paddingVertical:0,
    },
    SignIntextboxtext:{
        fontSize: 20,
        color: "blue",
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
        height: 40,
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
        flex: -100,

    }


});



