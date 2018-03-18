import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    Button,
    Alert
} from 'react-native';
import Login from '../views/login.js';
import * as firebase from "firebase";
import PropTypes from 'prop-types';
import Database from '../firebase/database';
import {GoogleSignin} from 'react-native-google-signin'

const window = Dimensions.get('window');

//logout is needed whether signed up via firebase or signed in via googlesignin in order to clear the observer back to null user
//google signout doesn't seem useful/doesn't seem to work with observer, but if you want to revoke access of google signin you do need revokeaccess()
//how this is currently set up is that access is revoked every signout if they are signed in under google

export default class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            fname: "",
            lname: "",
            user: ""
        };

    }

    async componentDidMount(){
        GoogleSignin.hasPlayServices({autoResolve: true});
        GoogleSignin.configure({
            webClientId:'1002267002264-1j8pm8s5q7go07v22ilej3ma7s1v4f3v.apps.googleusercontent.com',
            offlineAccess: false,
            forceConsentPrompt: true,

        });
        GoogleSignin.currentUserAsync().then((user) => {
            console.log('USER', user);
            this.setState({user: user});
        }).done();
        try {
            let user = await firebase.auth().currentUser;
            Database.listenUserName(user.uid, (data)=> {
                this.setState({
                    fname: data.fname,
                    lname: data.lname,
                })
            });

            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }
    }

    logout() {
        //     this.props.navigator.push({id: 'Login'});
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });

    }

    googleSignOut() {
        this.logout();
        if (this.state.user !== null) {
            GoogleSignin.revokeAccess().then(() => {
            }).done();

        }
    }




    render() {
        let user_name = this.state.fname;
        let last_name = this.state.lname;
        return (
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={{backgroundColor: 'transparent',
                            flex: -1,
                            position: 'absolute',
                            width: 130,
                            height: 130,
                            right: 80,
                            top: 10,
                            alignItems: "center",
                            borderColor: 'white',
                            borderRadius: 100/2,
                            borderWidth: 3,
                        }}
                        source={require ('../images/c6a4645d9f9af45a9c9d7b094c18a47a--portrait-ideas-girl-photos.jpg')}
                    />
                    <Text style={styles.name}>{user_name} {last_name}</Text>
                </View>
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>

                <Button
                    onPress={() => {
                        Alert.alert('Home');
                    }}
                    style={styles.item}
                    title='Home'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        onItemSelected('Messenger');
                    }}
                    style={styles.item}
                    title='Messenger'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        onItemSelected('User Search');
                    }}
                    style={styles.item}
                    title='User Search'
                    color='#273444'

                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        onItemSelected('Calendar');
                    }}
                    style={styles.item}
                    title='Calendar'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        onItemSelected('Favourite Pet Keepers');
                    }}
                    style={styles.item}
                    title='Favourite Pet Keepers'
                    color='#273444'
                />
                <Text

                    style={styles.item}
                >

                </Text>
                <Text
                    style={{color:'white',paddingBottom:20,fontSize: 24,
                        fontWeight: '300',}}
                >
                    ________________________
                </Text>
                <Button
                    onPress={() => {
                        onItemSelected('Setting');
                    }}
                    style={styles.item}
                    title='Setting'
                    color='#273444'
                />
                <Text

                    style={styles.item}
                >

                </Text>
                <Button
                    onPress={()=>this.googleSignOut()}

                    style={styles.item}
                    title='Sign Out'
                    color='#273444'
                />

            </View>
        );
    }
}



const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: (2.07/3)* window.width,
        height: window.height,
        backgroundColor: '#273444',
        padding: 10,

    },
    avatarContainer: {
        width: (2.1/3)* window.width,
        height: 200,

        left:-15,

        backgroundColor: '#28333a',
    },
    avatar: {
        width: 100,
        height: 100,
        flex: 1,
        borderColor: 'white',
        borderRadius: 100/2,
    },
    name: {
        position: 'absolute',
        right: 85,
        top: 140,
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    item: {
        fontSize: 24,
        fontWeight: '300',
        paddingTop: 5,

    },
});

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};