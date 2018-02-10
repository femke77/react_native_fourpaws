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
    ToastAndroid,

} from 'react-native';
import * as firebase from "firebase";
import {Navigator} from 'react-native-deprecated-custom-components';
import Signup2 from '../views/signupaddress'
import Database from '../firebase/database';


//TODO do an email verification - send user email
//TODO need to dismiss keyboard properly in thie and signupaddress.js
//TODO fix binding

export default class Signup extends Component {


    constructor(props) {
        super(props);
        console.ignoredYellowBox = [  //related to timeout on auth token of 60min, known issue
            'Setting a timer'
        ];

        this.state = {
            uid: "",
            fname: null,
            lname: null,
            contactNumber: null,
            username: null,
            email: null
        };

        this.goLogin = this.goLogin.bind(this);
        this.next = this.next.bind(this);

    }

    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid,
                email: user.email,
            });
        } catch (error) {
            alert(error);
        }
    }

    goLogin(){
        Database.remove(this.state.uid);
        this.props.navigator.push({id: 'Login'})
    }

    next (){
        if (this.state.fname && this.state.lname && this.state.username) {
            Database.setUser(this.state.uid, this.state.contactNumber, this.state.fname, this.state.lname, this.state.username, this.state.email);
            this.props.navigator.push({id: 'Signup2'});
        } else {
            ToastAndroid.show('Fields cannot be blank',ToastAndroid.SHORT);
        }
    }

    checkPhoneLen(contactNumber){

         if (contactNumber.length  !== 10){
            alert("Invalid phone entry - must be 10 digits")
        } else {
            this.next();
        }
    }



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
                    source={{ uri: 'https://static.pexels.com/photos/38867/pexels-photo-38867.jpeg'}}
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
                <Text style = {styles.topText}>
                    Please verify your email address by responding to our verification email in your inbox
                </Text>

                <TextInput
                    placeholder=" First Name"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={(fname) => this.setState({fname})}

                />

                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={(lname) => this.setState({lname})}
                />

                <TextInput
                    placeholder="Username"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={(username) => this.setState({username})}
                />



                <TextInput
                    placeholder=" Contact number"
                    keyboardType="numeric"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    maxLength={10}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={( contactNumber) => this.setState({ contactNumber})}
                />



                <TouchableOpacity style= {styles.button} onPress={()=>this.checkPhoneLen(this.state.contactNumber)}>
                    <Text style= {styles.buttonText} > Next </Text>
                </TouchableOpacity>

                <View>
                    <Text style= {styles.SignIntext}> Have account?</Text>
                    <TouchableOpacity style= {styles.SignIntextbox} onPress={()=>this.goLogin()}>
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
        fontSize: 16,
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
        fontSize: 18,
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
        height: 50,
        backgroundColor:'#666666',
        opacity: 10,
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:150,
        backgroundColor:'#2b98f0',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
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
        color:'#ffffff',
        textAlign:'center',
        flex: -100,

    }


});


