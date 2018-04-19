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


                <TextInput
                    placeholder=" Address"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="next"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={(address) => this.setState({address})}

                />

                <TextInput
                    placeholder="City"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={(city) => this.setState({city})}
                />
                <TextInput
                    placeholder="State"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    underlineColorAndroid={'transparent'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style= { styles.inputBox}
                    onChangeText={(state) => this.setState({state})}
                />



                <TextInput
                    placeholder=" Zipcode"
                    placeholderTextColor= "#ffffff"
                    returnKeyType="go"
                    keyboardType="numeric"
                    maxLength={5}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style= { styles.inputBox}
                    onChangeText={( zipcode) => this.setState({ zipcode})}
                />


                <View style={ {flexDirection:'row',marginTop:20}}>
                    <View style={ {margin:10}}>
                        <TouchableOpacity style= {styles.button}>
                            <Text style= {styles.buttonText}onPress={()=> this.goBack()}> Previous</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ {margin:10}}>
                        <TouchableOpacity style= {styles.button}>
                            <Text style= {styles.buttonText}onPress={()=> this.checkZipLen(this.state.zipcode)}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>

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
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:140,
        backgroundColor:'#2b98f0',
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


