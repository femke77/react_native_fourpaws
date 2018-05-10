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
    Keyboard,
    AsyncStorage,
    Button,
    Alert,

} from 'react-native';

import dismissKeyboard from 'react-native-dismiss-keyboard';
import * as firebase from "firebase";
import {GoogleSignin} from 'react-native-google-signin'

import Database from '../firebase/database.js'

//TODO put a space between the buttons, or side by side?
//TODO TEST all the firebase oodes and customize them as needed.
//TODO fix the google button because the onPress active range is way outside the actual button (whole container)
//TODO need forgot password functionality
//TODO fix arrow functions in render? or remove binding in constructor

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            buttonColor: '#BE3A31',
            button2color: '#2095d2',
            uid: '',

        };
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.passwordLength = this.passwordLength.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    //current scope is set to example (google drive) default is email and profile
    //change to DidMount()
    componentWillMount(){
        GoogleSignin.hasPlayServices({autoResolve: true});
        GoogleSignin.configure({
            webClientId:'1002267002264-1j8pm8s5q7go07v22ilej3ma7s1v4f3v.apps.googleusercontent.com',
            offlineAccess: false,
            forceConsentPrompt: true,

        });

    }

    passwordLength(password) {
        const minLength = 6;
        if (password.length < minLength) {
            Alert.alert(
                "Password Error",
                "Password must be at least 6 characters long",
                [
                    {text:'OK', onPress: () =>
                        console.log('ok pressed')},
                ],
                {cancelable: true}
            )
        }
    }
    passwordLengthSignUp(password) {
        const minLength = 6;
        if (password.length < minLength) {
            Alert.alert(
                "Create Account",
                "Enter a password at least 6 characters in length to create an account.",
                [
                    {text:'OK', onPress: () =>
                        console.log('ok pressed')},
                ],
                {cancelable: true}
            );
            return false
        }
        else return true;
    }

    validateEmail(email){

        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async googleSignIn(){

            const {idToken} = await GoogleSignin.signIn();
            const provider = firebase.auth.GoogleAuthProvider;
            const credential = provider.credential(idToken);
            const data = await firebase.auth().signInWithCredential(credential);

            //idToken contains the basic information about the google user - needs to be send to DB
            const user = {
                photoURL: data.photoURL,
                uid: await firebase.auth().currentUser.uid
            };

            if (!user.photoURL){
             user.photoURL= "";  //avoids a null reference error should no url be ava. from google acount
            }
           Database.findUID(user.uid, (bool) => {
                if (bool){
                    this.props.navigator.push({id:'Home'});
                }
                else{
                    this.props.navigator.push({id: 'Signup'});
                    Database.setFromGoogleAccount(user.uid, user);
                }
           });

    }


    async signup(email, password) {
        dismissKeyboard();
        let cancel = true;
        if (this.validateEmail(email)) {
            if(this.passwordLengthSignUp(password)){
                try {
                    await firebase.auth().createUserWithEmailAndPassword(email, password);

                    setTimeout(() => {
                        this.props.navigator.push({
                            id: "Signup"
                        })
                    }, 1500);
                }
                catch (error) {
                    this.passwordLengthSignUp(password);
                }
            }
        }
        else{
            Alert.alert(
                "Create Account",
                "Enter a valid email to create an account.")
        }
    }

    async login() {
        dismissKeyboard();
        if (!this.state.email || !this.state.password){
            alert("Email and Password Cannot Be Blank")
        }

        else{

            try {
                                                          //auth persistence should be .NONE in production and .LOCAL for dev
            await Promise.all([firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)],
            [firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)]);

            setTimeout(() => {
                this.props.navigator.push({
                    id: "Home"
                })
            }, 1500);

        } catch (error) {
            let errorMessage = error.message;
            alert(errorMessage);
        }
    }}

    resetPassword (email){
        if (this.validateEmail(email)){
                firebase.auth().sendPasswordResetEmail(email).then(function() {
                   alert("Password reset link has been sent to email");
               }).catch(function(error){

                    let errorMessage = error.message;
                    alert(errorMessage);
                });
        } else {
        alert("Not a valid email");
        }
    }


    render(){
        const resizeMode = 'cover';

        return (
            <KeyboardAvoidingView /*behavior="padding"*/ style={styles.TextCSS1}>
                <StatusBar
                    //backgroundColor="red"
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

                        marginTop: "5%",
                        marginBottom: "5%",
                        //justifyContent: 'center',
                        //alignItems: 'center',
                        width: 230,
                        height: 230,
                        //paddingVertical: 50
                    }}

                    source={require('../images/FourPaws.png')} // logo
                />
                <Text style={styles.welcome}>
                    Welcome
                </Text>
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor= "black"
                    returnKeyType="go"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    underlineColorAndroid={'#2095d2'}
                    onChangeText={(password) => this.setState({password})}
                />
                <View>

                <View style={{
                    //flex: -1,
                    height: 25,
                    flexDirection: 'row',
                    //justifyContent: 'space-between'
                }}>

                    <TouchableOpacity
                        style= {styles.button}
                        color={this.state.buttonColor}
                        onPress={()=>{this.login()}}
                        title={"  login  "}
                        //    icon={{name: 'lock'}}
                        >
                        <Text
                            style= {styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button2}
                        color={this.state.button2Color}
                        onPress={()=>{this.signup(this.state.email, this.state.password)}}
                        title={"create account"}
                        //    icon={{name: 'lock'}}
                    >
                        <Text
                            style= {styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container2}>
                    <TouchableOpacity
                        onPress={()=>this.googleSignIn()}>
                        <Image
                            source = {require('../images/google_signin.png')}
                            style ={styles.image}
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style= {styles.passwordFtext} onPress={()=>this.resetPassword(this.state.email)}  >
                    Forgot Password
                </Text>
                </View>

                <Text style={styles.bottomtext}>
                    Copyright © 2018 FourPaws
                </Text>

            </KeyboardAvoidingView>
        );
    }
}

//if any of this is going to be common to many pages, please move that part to /components/styles and import
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
        fontSize: 30,
        textAlign: 'center',
        marginBottom: '5%',
        color: "white",
        //textDecorationLine: 'underline'
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
        color: "#2095d2",
        //textDecorationLine: 'underline',
        //position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 90,
        paddingVertical:0
    },
    //Forgot password
    passwordFtext: {
        fontSize: 12,
        textAlign: 'center',
        //margin: 10,
        color: "#2095d2",
        //textDecorationLine: 'underline',
        //position: 'absolute',
        justifyContent: 'flex-end',
        //bottom: 30,
        paddingTop: 5,
        paddingBottom: 40
    },

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
        color: '#2095d2',
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
        //marginTop: -15,
        //marginLeft: 17,
        paddingTop: '5%',
        alignItems: 'center'
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
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color:'#ffffff',
        textAlign:'center',
        flex: -1,
    },
    image:{

        width: 160,
        height: 40,
        //resizeMode: 'contain'
    }

});

