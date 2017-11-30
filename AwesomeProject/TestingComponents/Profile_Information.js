import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image,
    Dimensions


} from 'react-native';


import Tabs from './tabs';

import {RkStyle, RkTabView, RkText,RkTheme} from 'react-native-ui-kitten';


export default class Profile_Information extends Component {


    render() {
        let renderTab = (isSelected, title, value) => {
            let backgroundColor = isSelected ? '#d91e18' : 'white';
            let color = (!isSelected) ? '#d91e18' : 'white';
            return (
                <View
                    style={{
                        backgroundColor,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',



                    }}>

                    <RkText style={{color, marginLeft: 1}}>{title}</RkText>
                </View>);
        };
        return (

                <View >
                <RkTabView rkType='rounded'>
                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Review', 213);
                    }}>
                        <Text style={styles.text13}> Reviews..... </Text>
                    </RkTabView.Tab>

                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Follower', 5);
                    }}>
                        <Text>Follower</Text>
                    </RkTabView.Tab>
                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Photo', 6);
                    }}>
                        <Text>Photos</Text>
                    </RkTabView.Tab>
                </RkTabView>
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
        color: 'black', // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
        width: 140,

    },
    statContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingBottom: 10,
        paddingHorizontal: '100%',
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        width: '100%',
        top: 146,
        borderRadius: 35,
    },
    statContainerSelected: {
        borderBottomColor: 'white',
    },
    titleStatText: {
        fontSize: 20,
    },
    statTextSelected:{
        color: "black",
    },
    statText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray'
    },
    tabView: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 135,
        paddingTop: 55,
        paddingBottom: 13,
        overflow: 'hidden',

    },
    tabContent: {
        paddingVertical: 5,
        backgroundColor: "black",
    },
    imageTab: {
        backgroundColor: 'white',
    },



});

RkTheme.setType('RkTabView', 'rounded', {
    flex: 2,
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: '#4a636d',
    tabContainer: {
        padding: 2,
        borderRadius: 10,


        borderWidth: 5,
        borderLeftWidth: 10,
        borderRightWidth: 10,

        maxHeight: 34,

    },




});