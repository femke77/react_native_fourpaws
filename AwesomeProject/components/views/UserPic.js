import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image


} from 'react-native';

const SideMenu = require('react-native-side-menu');
export default class UserPic extends Component {
    render() {
        return (
            <View>
                <View>
                    <Image
                        style={{backgroundColor: 'transparent',
                            flex: -1,
                            position: 'absolute',
                            width: 100,
                            height: 100,
                            top:25,

                            right: 10,
                            //paddingVertical:-10,
                            borderColor: 'white',
                            borderRadius: 100/2,
                            borderWidth: 3,


                        }}
                        source={require ('../images/c6a4645d9f9af45a9c9d7b094c18a47a--portrait-ideas-girl-photos.jpg')}
                    />
                </View>
                <View>
                    <Text style={styles.text13}>
                        Mary Jane
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
        top: 125, // Center
        fontFamily: 'Avenir',
        fontSize: 25,
        right: 0,
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
});

