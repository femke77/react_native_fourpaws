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
                        borderColor: 'black',
                        borderRadius: 100/2,
                        borderWidth: 2,


                    }}
                    source={{ uri: 'https://www.pdclipart.org/albums/Animals_Dogs_Domestic/dogs_funny_pose.png' }}
                />
                </View>
                <View>
                    <Text style={styles.text13}>
                        JOHN DOE
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
});

class Application extends React.Component {
    render() {
        const menu = <Menu navigator={navigator}/>;

        return (
            <SideMenu menu={menu}>
                <UserPic/>
            </SideMenu>
        );
    }
}