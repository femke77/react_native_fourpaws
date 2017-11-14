import React, {Component} from 'react';
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


} from 'react-native';

import Tabs from '../styles/tabs'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {


        }

        this.logout = this.logout.bind(this)
    }

    async logout() {
        try {
            await firebase.auth().signOut();
            this.props.navigator.push({
                name: "Login"
            })
        } catch (error) {
            console.log(error);
        }

    }



    render() {
        return (
            <View style={styles.container13}>
                <Tabs>
                    {/* First tab */}
                    <View title="User Profile" style={styles.content13}>
                        <Text style={styles.header13}>
                            Welcome User
                        </Text>
                        <Text style={styles.text13}>
                            Need to add picture and user information
                        </Text>
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
                            .......
                        </Text>
                        <Text style={styles.text13}>
                            Whats up
                        </Text>
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