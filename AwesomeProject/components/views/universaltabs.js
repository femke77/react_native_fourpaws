import React, { Component } from 'react';
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
    Button,
    ScrollView



} from 'react-native';


import Tabs from './tabs';
import Profile_Information from './Profile_Information';


import UserPic from './UserPic';



import Mapviews from "./Mapview";
import Calendars from "./calendar";
import FavoritePetKeeper from "./favoritepetkeeper";




const SideMenu = require('react-native-side-menu');

this.state = {
    menuOpen: false
}

export default class Universaltabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 2
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    handleMenu() {
        const {menuOpen} = this.state
        this.setState({
            menuOpen: !menuOpen
        })
    }
    render() {

        return (

            <View style={styles.container13}>


                <Tabs>
                    {/* First tab */}

                    <View title="User Profile" style={styles.content13}>


                        <Image
                            style={{backgroundColor: '#ccc',
                                flex: 1,
                                resizeMode: 'cover',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                            }}
                            source={require('../images/bluebackground1-1024x640.png')}
                        />
                        <View>
                            <UserPic/>
                        </View>
                        <View>

                        </View>

                        <Profile_Information/>

            </View>



    {/* Second tab */}
                    <View title="Upcoming appointments" style={styles.content13}>
                        <Image
                            style={{backgroundColor: '#ccc',
                                flex: 1,
                                resizeMode: 'cover',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                            }}
                            source={require('../images/bluebackground1-1024x640.png')}
                        />
                        <Calendars/>


                    </View>
                    {/* Third tab */}
                    <View title="Favorite pet keeper" style={styles.content13}>
                        <Image
                            style={{backgroundColor: '#ccc',
                                flex: 1,
                                resizeMode: 'cover',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                            }}
                            source={require('../images/bluebackground1-1024x640.png')}
                        />
                        <FavoritePetKeeper/>


                    </View>
                    {/* Fourth tab */}
                    <View title="User Search" style={styles.content13}>

                        <Mapviews/>

                    </View>

                </Tabs>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container13: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#383838',

        // Background color
    },
    container14: {
        flex: 2,
        top:100// Take up all screen

        // Background color
    },
// Tab content container
    content13: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#d91e18',         // Darker background for content area
    },
// Content header
    header13: {
        margin: 10,                         // Add margin
        color: '#ffec01',                   // White color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 26,

        // Bigger font size
    },
    headerstars: {
        top: -330,
        margin: 40,
        right: -25,

        // Bigger font size
    },

    headerstarsIOS: {
        top: -300,
        margin: 30,
        right: -25,

        // Bigger font size
    },
    headerUSername: {
        margin: 30,                         // Add margin
        color: '#ffec01',                   // White color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 25,
        right: -25,
        top: -260,
        textDecorationLine: 'underline',
        fontWeight: 'bold',

        // Bigger font size
    },
    headerUSernameIOS: {
        margin: 30,                         // Add margin
        color: '#ffec01',                   // White color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 45,
        right: -25,
        top: -240,
        textDecorationLine: 'underline',
        fontWeight: 'bold',

        // Bigger font size
    },
    TextChangepic: {
        margin: -10,                         // Add margin
        color: 'white',                   // blue or white color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 10,
        top: -95,
        right: 130,
        textDecorationLine: 'underline',

        // Bigger font size
    },
// Content text
    text13: {
        marginHorizontal: 10,               // Add horizontal margin
        color: 'white', // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        position:'absolute',
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor:'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor:'#007AFF',


    },
    STabsView:{
        alignItems:'flex-end',
        top: 175,
        bottom: 715,
        width: 75,
        opacity: 30,
        flex: 1,
        justifyContent: 'flex-end',

    },

    container10: {
        flex: 1,                            // Take up all screen
        top: -200,
        //paddingBottom: 150,
    },
    text10: {
        marginHorizontal: 0,               // Add horizontal margin
        color: '#fff', // Semi-transparent text
        top: 115, // Center
        fontFamily: 'Avenir',
        fontSize: 18,
        right: -8,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },


});



