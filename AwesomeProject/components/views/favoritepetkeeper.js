import React, {Component} from 'react';
import {
    AppRegistry,
    FlatList,
    Alert,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Button

} from 'react-native';

import Tabs from '../styles/tabs';
import * as firebase from "firebase";
import Login from './login.js';
import {GoogleSignin} from 'react-native-google-signin'

import Swipeout from 'react-native-swipeout';
import testData from '../data/testData';

class FlatListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeRowKey:   null    // where selected key can be stored
        };
    }

    render() {
        const swipeSetting = {
            autoClose:  true,
            onclose:    (secId,rowId,direction) => {
                if(this.state.activeRowKey != null)
                    this.setState({activeRowKey: null});
            },
            onOpen:     (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right:      [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text: 'Yes', onPress: () => {
                                    testData.splice(this.props.index, 1);
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                    }},
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                            ],
                        {cancelable: true}
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId:      this.props.index,
        };
        return (

            <Swipeout {...swipeSetting}>
                <View style={{      // makes the column that will have rows of data
                    flex: 1,                                // Take up all screen
                    flexDirection: 'column',
                }}>
                    <View style={{  // each row of data
                        flex: 1,                            // Take up all screen
                        flexDirection: 'row',
                        backgroundColor: this.props.index % 2 == 0 ? '#d91e18' : 'darkred',
                    }}>

                        <Image      //  image is placed to the left of the text
                            source={{uri: this.props.item.image}}
                            style={{width: 100, height: 100, margin:5}}
                        >
                        </Image>
                        <View style={{ // text is placed as a column to the right of the image
                            flex: 1,                           // Take up all screen
                            flexDirection: 'column',
                        }}>
                            <Text style={styles.text13}>{this.props.item.name}</Text>
                            <Text style={styles.text13}>{this.props.item.email}</Text>
                        </View>
                    </View>
                    <View style={{                              // trimming
                        height: 1,                              // trim width
                        backgroundColor: 'white',               // trim color
                    }}>

                    </View>
                </View>
            </Swipeout>

        );
    }
}

export default class FavoritePetKeeper extends Component {

    constructor(props){
        super(props);
        this.state = {
            deletedRowKey: null,
        }
    }
    refreshFlatList = (deletedKey) => { // automatically refresh list after deleting object
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
    };

    _onPressAdd(){
        alert("Add Favorite Pet Keeper");
    }







    render() {
        return (
            <View style={styles.container13}>
                <Tabs >
                    {/* First tab */}
                    <View title="User Profile" style={styles.content13}>
                        <Text style={styles.header13}>
                            Welcome User
                        </Text>
                        <Text style={styles.text13}>

                        </Text>

                        <Button onPress={()=>{this.logout()}}
                                title={"Log Out  "}/>
                        <Button onPress={()=>{this.googleSignOut()}}
                                title={"Revoke Google Auth and Logout "}/>
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
                    <View title="Favorite pet keeper">
                        <View style={styles.content14}>
                            <TouchableHighlight
                                style={{marginRight: 10}}
                                underlayColor = 'grey'
                                onPress={this._onPressAdd}>
                                <Image
                                    style={{width: 35, height: 35}}
                                    //source={require('../icons/icons-add.png')
                                    source={{uri: "https://image.flaticon.com/icons/png/128/54/54443.png"}}>
                                </Image>
                            </TouchableHighlight>
                        </View>
                        <FlatList
                            data={testData}
                            renderItem={({item, index})=>{
                                return(
                                    <FlatListItem item = {item} index = {index} parentFlatList={this}>
                                    </FlatListItem>
                                );
                            }}
                        >
                        </FlatList>
                    </View>








                    {/* Third tab */}
                    <View title="User Search" style={styles.content13}>
                        <Text style={styles.header13}>
                            Search Google maps
                        </Text>
                        <Text style={styles.text13}>
                            No code found in the file
                        </Text>
                    </View>

                </Tabs>
            </View>
        );


    }
}
const styles = StyleSheet.create({
// App container
    container13: {
        flex: 1,                            // Take up all screen
        marginTop: Platform.OS === 'ios' ? 34 : 0,      // iOS or Android
        backgroundColor: '#383838',         // Background color
    },
// Tab content container
    content13: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#d91e18',         // Darker background for content area
    },
    content14: {
        flexDirection: 'row',                            // Take up all available space
        justifyContent: 'flex-end',           // Center vertically
        alignItems: 'center',               // Center horizontally

        backgroundColor: 'darkred',
        height: 64,
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