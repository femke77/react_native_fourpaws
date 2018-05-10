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

import Signup2 from '../views/signupaddress'
import Database from '../firebase/database';





export default class Signup extends Component {


    constructor(props) {
        super(props);


        this.state = {
            uid: "",
            fname: null,
            lname: null,
            contactNumber: null,
            username: null,
            email: null,
            image: "image URL",
        };

        this.goLogin = this.goLogin.bind(this);
        this.next = this.next.bind(this);

    }

    async componentDidMount(){
        ToastAndroid.showWithGravity(
            'Please respond to verification email in your inbox',
            ToastAndroid.LONG,
            ToastAndroid.TOP
        );
        try {
            let user = await firebase.auth().currentUser;

            this.setState({
                uid: user.uid,
                email: user.email,
            });

            Database.listenGoogleAccountInfo(user.uid, (data)=> {
                this.setState({
                    image: data.image
                })
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
        if (this.state.fname && this.state.lname && this.state.username ) {
            Database.setUser(this.state.uid, this.state.contactNumber, this.state.fname, this.state.lname, this.state.username, this.state.email, this.state.image);
            this.props.navigator.replace({id: 'Signup2'});
        } else {
            ToastAndroid.show('Fields cannot be blank',ToastAndroid.SHORT);
        }
    }

    checkPhoneLen(contactNumber){
         if (contactNumber === null){
             alert("Please input 10 digit phone number")
         }
         else if (contactNumber.length  !== 10){
            alert("Invalid phone entry - must be 10 digits")
        } else {
            this.next();
        }
    }



    render(){
        const resizeMode = 'cover';
        let image = this.state.image;
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
                    placeholder=" First Name"
                    placeholderTextColor= "black"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'#2095d2'}
                    style= { styles.inputBox}
                    onChangeText={(fname) => this.setState({fname})}

                />

                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor= "black"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'#2095d2'}
                    style= {styles.inputBox}
                    onChangeText={(lname) => this.setState({lname})}
                />

                <TextInput
                    placeholder="Username"
                    placeholderTextColor= "black"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'#2095d2'}
                    style= {styles.inputBox}
                    onChangeText={(username) => this.setState({username})}
                />



                <TextInput
                    placeholder=" Contact number"
                    keyboardType="numeric"
                    placeholderTextColor= "black"
                    returnKeyType="go"
                    maxLength={10}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= {styles.inputBox}
                    onChangeText={( contactNumber) => this.setState({ contactNumber})}
                />

                {/*Upload Image Here*/}
                {/*<TextInput*/}
                    {/*placeholder = "Image URL"*/}
                    {/*value = {image}*/}
                    {/*selectTextOnFocus = {true}*/}
                    {/*placeholderTextColor= "#ffffff"*/}
                    {/*returnKeyType="next"*/}
                    {/*keyboardType= "email-address"*/}
                    {/*autoCapitalize="none"*/}
                    {/*autoCorrect={false}*/}
                    {/*underlineColorAndroid={'transparent'}*/}
                    {/*style= { styles.inputBox}*/}
                    {/*onChangeText={(image) => this.setState({image})}*/}
                {/*/>*/}

                <TouchableOpacity
                    style= {styles.button2}
                    onPress={()=>this.checkPhoneLen(this.state.contactNumber)}>
                    <Text style= {styles.buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>

                <View style={{
                    flex: -1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10
                }}>
                    <Text style= {styles.SignIntext}> Have account?</Text>
                    <TouchableOpacity
                        style= {styles.SignIntextbox} onPress={()=>this.goLogin()}>
                        <Text style= {styles.SignIntextboxtext}>Login Here</Text>
                    </TouchableOpacity>

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


