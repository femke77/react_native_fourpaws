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
    Button,
    Keyboard,
    AsyncStorage

} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import Swipeout from 'react-native-swipeout';
import Database from '../../firebase/database';
import * as firebase from "firebase";

const mapStateToProps = (state) => ({
    chat: state.chatroom,
    chatHeight: state.chatroom.meta.height,
    user: state.user,
    navigator: state.navigator,
});

class FlatListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeRowKey:   null,    // where selected key can be stored
        };
    }
    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }
    }

    _onPressAdd(){
        alert("Add New");
    }
    _onPressProfile(){
        Alert.alert(
            'View Profile',
            'Are you sure you want to leave this page?',
            [
                {text: 'Yes', onPress: () => {
                    let key = this.props.item.key;
                }},
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: true}
        );
    }

    render() {
        const swipeSetting = {
            autoClose:  true,
            onclose:    (secId,rowId,direction) => {
                if(this.state.activeRowKey !== null)
                    this.setState({activeRowKey: null});
            },
            onOpen:     (secId, rowId, direction) => {
                this.setState({
                    activeRowKey: this.props.item.key
                });
            },
            right:      [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Delete Conversation',
                            'Are you sure you want to delete?',
                            [
                                {text: 'Yes', onPress: () => {
                                   let key = this.props.item.key;
                                   Database.removeChat(this.state.uid, key);
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
            <View>
            <Swipeout {...swipeSetting}>
                <View style={{      // makes the column that will have rows of data
                    flex: 1,                                // Take up all screen
                    flexDirection: 'column',
                }}>
                    <View style={{  // each row of data
                        flex: 1,                            // Take up all screen
                        flexDirection: 'row',
                        // backgroundColor: this.props.index % 2 === 0 ? '#F39C12' : '#F9690E',
                    }}>
                        <TouchableHighlight // click on user image to go to profile
                            underlayColor = 'grey'
                            onPress={() => {
                                this.props.navigator.push({
                                    id: 'User',
                                    uniqueId: this.props.item.uid,
                                });
                            }}
                        >
                            <Image
                                source={{uri: this.props.item.avatar}}
                                style={{width: 80, height: 80, margin:5}}>
                            </Image>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{flex: 1}}
                            underlayColor = 'grey'
                            onPress={() => {
                                this.forceUpdate();
                                this.props.navigator.push({
                                    id: 'MessageUI',
                                    name: this.props.item.name,
                                    chatId: this.props.item.id,
                                });
                            }}
                        >
                            <View style={{ // text is placed as a column to the right of the image
                                flex: 1,                           // Take up all screen
                                flexDirection: 'column',
                            }}>
                                <Text style={styles.text13}>{this.props.item.name}</Text>
                                    <Text style={styles.text13}>Send a message</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{                              // trimming
                        height: 1,                              // trim width
                        backgroundColor: 'white',               // trim color
                    }}>
                    </View>
                </View>
            </Swipeout>
            </View>
        );
    }
}

export default class ChatList extends Component {
    constructor(props){
        super(props);

        this.state = {
            deletedRowKey: null,
            data: []
        }
    }

    async componentDidMount(){
        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid,
            });

            Database.listenChatUsers(user.uid, (data)=> {
                this.setState({
                    data: data
                })
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <View style={styles.container13}>
                <FlatList
                    // navigator={this.props.navigator}
                    data={this.state.data}
                    renderItem={({item, index})=>{
                        return(
                            <FlatListItem
                                navigator={this.props.navigator}
                                item = {item}
                                index = {index}
                                parentFlatList={this}
                                onPress={this._onPressSwitch}>
                            </FlatListItem>
                        );
                    }}
                >
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
// App container
    container13: {
        flex: 1,                            // Take up all screen
        marginTop: Platform.OS === 'ios' ? 34 : 0,      // iOS or Android
        paddingTop: 10,
        // backgroundColor: '#383838'
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
        marginHorizontal: 5,               // Add horizontal margin
        // color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
        color: 'black', // Semi-transparent text
        // textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    },
});

