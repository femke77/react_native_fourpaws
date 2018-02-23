import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ListView,
    ScrollView


} from 'react-native';


import Tabs from './tabs';
import UserPic from './UserPic';
import {RkStyle, RkTabView, RkText,RkTheme} from 'react-native-ui-kitten';
import List from "./ListView";


export default class Profile_Information extends Component {

    constructor(props){
        super(props)
    }


    render() {
        let renderTab = (isSelected, title, value) => {
            let backgroundColor = isSelected ? '#ff7a00' : 'white';
            let color = (!isSelected) ? '#d91e18' : 'white';
            let opacity= (!isSelected) ? 0.7 : 1;
            return (

                <View
                    style={{
                        backgroundColor,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        right: 7 ,
                        //left: 5,
                        paddingBottom: 0,
                        height: 25,
                        bottom: 3,
                        width: 108,
                        borderRadius: 100,
                        opacity,



                    }}>

                    <RkText style={{color,  alignContent:'center' , right: 25 }}>{title}</RkText>
                </View>);
        };
        return (

            <View style={styles.NewTab}>
                <RkTabView rkType='rounded'>
                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Reviews');
                    }}>

                        <List style={styles.text13} />
                    </RkTabView.Tab>

                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Follower');
                    }}>
                        <Text style={styles.text13}>Follower</Text>
                    </RkTabView.Tab>
                    <RkTabView.Tab title={(selected) => {
                        return renderTab(selected, 'Photo');
                    }}>
                        <Text style={styles.text13}>Photos</Text>
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
        width: 300,


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
    NewTab: {
        top: 180,


    },



});

RkTheme.setType('RkTabView', 'rounded', {
    flex: 2,
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderColor: '#192229',
    tabContainer: {
        padding: 2,
        borderRadius: 360,


        borderWidth: 5,
        borderLeftWidth: 10,
        borderRightWidth: 10,

        maxHeight: 34,

    },




});