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



} from 'react-native';


import Tabs from './tabs';
import Profile_Information from './Profile_Information';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import UserPic from './UserPic';



import MapView from 'react-native-maps';

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
                            source={{ uri: 'http://www.clker.com/cliparts/0/5/9/1/1430368724442417087yellow%20orange%20peach%20pink%20blur%20wallpaper%20android%20background%20mixed%20combiantion%20plus%20radiant%20gradient.jpg'}}
                        />






                            <Profile_Information/>



                    </View>


                    {/* Second tab */}
                    <View title="Upcoming appointments" style={styles.content13}>

                        <Text style={styles.header13}>
                            You have no appointments
                        </Text>
                        <Text style={styles.text13}>
                            Planning of adding a list with option to add to google calendar
                        </Text>
                    </View>
                    {/* Third tab */}
                    <View title="Favorite pet keeper" style={styles.content13}>
                        <Text style={styles.header13}>
                            Coming Soon
                        </Text>
                        <Text style={styles.text13}>
                            Hopefully by next sprint
                        </Text>
                    </View>
                    {/* Third tab */}
                    <View title="User Search" style={styles.content13}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 34.24116,
                                longitude: -118.5291,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <MapView.Marker
                                coordinate={{
                                    latitude: 34.24116,
                                    longitude: -118.5291,
                                }}
                            >
                                <View style={styles.radius}>
                                    <View style={styles.marker}     />
                                </View>
                            </MapView.Marker>
                        </MapView>

                    </View>

                </Tabs>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container13: {
        flex: 56,                            // Take up all screen
        backgroundColor: '#383838',
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

    }




});

