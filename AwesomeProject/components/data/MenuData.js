import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    Button,
    Alert
} from 'react-native';
import Login from '../views/login.js';
import * as firebase from "firebase";

const window = Dimensions.get('window');


export default class Menu extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);

    }


        logout() {

            this.props.navigator.push({ id: 'Login'});
            firebase.auth().signOut().then(function() {
            }).catch(function(error) {
            });

        }



    render() {
        return (
            <View style={styles.menu}>
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
                        source={require ('../images/c6a4645d9f9af45a9c9d7b094c18a47a--portrait-ideas-girl-photos.jpg')}
                    />
                    <Text style={styles.name}>Mary Jane</Text>
                </View>
                <Text style={{color:'white',paddingBottom:20}}>

            </Text>

                <Button
                    onPress={() => {
                    Alert.alert('Home');
                }}
                    style={styles.item}
                    title='Home'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        Alert.alert('Messenger');
                    }}
                    style={styles.item}
                    title='Messenger'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        Alert.alert('User Search');
                    }}
                    style={styles.item}
                    title='User Search'
                    color='#273444'

                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        Alert.alert('Calendar');
                    }}
                    style={styles.item}
                    title='Calendar'
                    color='#273444'
                />
                <Text style={{color:'white',paddingBottom:20}}>

                </Text>
                <Button
                    onPress={() => {
                        Alert.alert('Favourite Pet Keepers');
                    }}
                    style={styles.item}
                    title='Favourite Pet Keepers'
                    color='#273444'
                />
                <Text

                    style={styles.item}
                >

                </Text>
                <Text
                    style={{color:'white',paddingBottom:20,fontSize: 24,
                        fontWeight: '300',}}
                >
                 ________________________
                </Text>
                <Button
                    onPress={() => {
                        Alert.alert('Setting');
                    }}
                    style={styles.item}
                    title='Setting'
                    color='#273444'
                />
                <Text

                    style={styles.item}
                >

                </Text>
                <Button
                    onPress={()=>this.logout()}
                    style={styles.item}
                    title='Sign Out'
                    color='#273444'
                />

            </View>
        );
    }
}



const styles = StyleSheet.create({
    menu: {
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
        position: 'absolute',
        right: 85,
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
});