import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight


} from 'react-native';
import Database from '../firebase/database';
import * as firebase from "firebase";
import {Navigator} from 'react-native-deprecated-custom-components';

//TODO the image must pull from the image url in user/details

export default class UserPic extends Component {

    constructor(props){
        super(props);
        console.ignoredYellowBox = [  //related to timeout on auth token of 60min, known issue
            'Setting a timer',
            'Invalid query string' //not working
        ];
        this.state = {
            fname: ""
        };


    }


    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            Database.listenUserName(user.uid, (data)=> {
                this.setState({
                    fname: data.fname,
                    lname: data.lname
                })
            });

            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }
    }


    onPressUP(){
        alert("User Information");
    }

    onPressMessage(){
        alert("User Information");
    }

    render() {
        let fname = this.state.fname;
        let lname = this.state.lname;

        return (
            <View>
                <View>
                                    <Image
                                        style={{backgroundColor: 'transparent',
                                            flex: -1,
                                            position: 'absolute',
                                            width: 100,
                                            height: 100,
                                            top:35,

                                            right: 160,
                                            //paddingVertical:-10,
                                            borderColor: 'white',
                                            borderRadius: 100/2,
                                            borderWidth: 3,


                                        }}
                                        source={require ('../images/person.png')}  //need to pull this from the database by uid
                                    />
                                </View>

                <View>
                    <Text style={styles.text13}>
                        {fname} {lname}
                    </Text>

                </View>

                <View>
                    <Text style={styles.text15}>
                        There are two means of refuge from the miseries of life: music and cats.

                    </Text>

                </View>

                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container13: {
        flex: 1,                            // Take up all screen
        top: -200,
        //paddingBottom: 150,
    },
    text13: {
        marginHorizontal: 0,               // Add horizontal margin
        color: '#fff', // Semi-transparent text
        top: 135, // Center
        fontFamily: 'Avenir',
        fontSize: 25,
        textAlign: 'center' ,
        textDecorationLine: 'underline',
        fontWeight: 'bold',

    },
    text14: {
        marginHorizontal: 0,               // Add horizontal margin
        color: '#fff', // Semi-transparent text
        top: 145, // Center
        fontFamily: 'Avenir',
        fontSize: 15,
        right: 0,
        fontWeight: 'bold',
        opacity: 0.7,
    },
    text15: {
        marginHorizontal: 0,               // Add horizontal margin
        color: '#fff', // Semi-transparent text
        top: 145, // Center
        fontFamily: 'Avenir',
        fontSize: 10,
        right: 0,
        paddingRight: 50,
        paddingLeft: 50,
        fontWeight: 'bold',
        opacity: 0.6,
        textAlign: 'center'
    },
});

