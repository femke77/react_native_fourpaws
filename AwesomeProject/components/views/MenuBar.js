import SideMenu from 'react-native-side-menu';
import Universaltabs from "./universaltabs";
import React, { Component, Props } from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    Image,
    Text,
    Button,
    Alert
} from 'react-native';

import * as firebase from "firebase";
import PropTypes from 'prop-types';
import Database from '../firebase/database';
import {GoogleSignin} from 'react-native-google-signin'
import Login from '../views/login.js'
import Messenger from "../messenger/Messenger";


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
            user: "",
            image: ""
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
            Database.listenUserInfo(user.uid, (data)=> {
                this.setState({
                    fname: data.fname,
                    lname: data.lname,
                    image: data.image
                })
            });
            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }

    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

    logout() {
        this.props.navigator.push({id: 'Login'});
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
            <View style={styles.menu1}>
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
                        source={{uri: this.state.image}}
                    />
                    <Text style={styles.name}>{user_name} {last_name}</Text>
                </View>
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>

                <Button
                    onPress={() => {
                        this.state.onMenuItemSelected = 'Home';
                        this.props.navigator.replace({id: 'Home'});
                    }}
                    style={styles.item}
                    title='Home'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        this.state.onMenuItemSelected = 'Messenger';
                        this.props.navigator.replace({id: 'Messenger'});
                    }}
                    style={styles.item}
                    title='Messenger'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        this.state.onMenuItemSelected = ('UserSearch');
                        this.props.navigator.replace({id: 'UserSearch'})
                    }}
                    style={styles.item}
                    title='User Search'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        this.state.onMenuItemSelected = ('Calendar');
                        this.props.navigator.replace({id: 'Calendar'})
                    }}
                    style={styles.item}
                    title='Calendar'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        this.state.onMenuItemSelected = ('FavoritePetKeeper');
                        this.props.navigator.replace({id: 'FavoritePetKeeper'})
                    }}
                    style={styles.item}
                    title='Favorite Pet Keepers'
                    color='#273444'
                />
                <Text style={styles.item}>

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
                <Text style={styles.item}>

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
    menu1: {
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
        // position: 'absolute',
        // right: 85,
        flex: 1,
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
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'red',
        padding: 20,
    },
});




Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};