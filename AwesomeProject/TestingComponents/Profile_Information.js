import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image


} from 'react-native';


import Tabs from './tabs';



export default class Profile_Information extends Component {
    render() {
        return (
            <View style={styles.container13}>
                <Image
                    style={{backgroundColor: 'transparent',
                        flex: -1,
                        position: 'absolute',
                        width: 100,
                        height: 120,
                        top: 10,
                        right: 80,
                        paddingVertical:10,
                        borderColor: 'black',
                        borderRadius: 33,
                        borderWidth: 3,


                    }}
                    source={{ uri: 'https://www.pdclipart.org/albums/Animals_Dogs_Domestic/dogs_funny_pose.png' }}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
// App container
    container13: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#383838',         // Background color
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
        fontSize: 26,                       // Bigger font size
    },
// Content text
    text13: {
        marginHorizontal: 20,               // Add horizontal margin
        color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    },



});