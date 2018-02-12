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
            buttonColor: 'red',
            button2color: 'blue',

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
                'Password Error',
                'Password must be at least 6 characters long',
                [
                    {text:'OK', onPress: () =>
                        console.log('ok pressed')},
                ],
                {cancelable: true}
            )
        }
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

            //idToken contains the basic information about the google user - needsd to be send to DB
            const user = {
                mail: data.email,
                photoURL: data.photoURL,
                name: data.displayName,
            };
            this.props.navigator.push({id:'Home'});
            return user;


    }


    async signup(email, password) {
        dismissKeyboard();
        if (this.validateEmail(email)) {
            this.passwordLength(password);
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);

                setTimeout(() => {
                    this.props.navigator.push({
                        id: "Signup"
                    })
                }, 1500);

            } catch (error) {
                let errorMessage = error.message;
                alert(errorMessage);
            }
        }
        else{
            alert("Invalid email")
        }
    }

    async login() {
        dismissKeyboard();
        try {                                   //auth persistence should be .NONE in production
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
    }

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
                    placeholder="Email Address"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={(email) => this.setState({email})}
                />

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
                    <Text style= {styles.passwordFtext} onPress={()=>this.resetPassword(this.state.email)}  >Forgot Password</Text>
               <View style={{justifyContent:'space-around'}}>
                <Button
                        color={this.state.buttonColor}
                        onPress={()=>{this.login()}}
                        title={"  login  "}
                    //    icon={{name: 'lock'}}
                />

                <Button
                    color={this.state.button2color}
                    onPress={()=>{this.signup(this.state.email, this.state.password)}}
                    title={"create account"}
                />
                </View>
            <View style={styles.container2}>
            <TouchableOpacity onPress={()=>this.googleSignIn()}>
                <Image source = {require('../assets/google_signin.png')} style ={styles.image}/>


                </TouchableOpacity>
            </View>
                <Text style={styles.bottomtext}>

                    Copyright © 2017 Four Paws
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
        margin: 0,
        color: "#ffffff",
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 5,
        paddingVertical:0
    },
    //Forgot username
    Usernametext: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#0000ff",
        textDecorationLine: 'underline',
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 90,
        paddingVertical:0
    },
    //Forgot password
    passwordFtext: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#0000ff",
        textDecorationLine: 'underline',
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 30,
        paddingVertical:0
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
        marginBottom: -110,

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

    },
    image:{

        width: 170,
        height: 90,
        resizeMode: 'contain'

    }

});

