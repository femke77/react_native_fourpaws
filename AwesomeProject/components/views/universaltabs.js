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
    ScrollView
} from 'react-native';

import { Header, Avatar } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Tabs from './tabs';
import * as firebase from "firebase";
import Database from '../firebase/database';
import { Nav, Tab } from 'react-native-simple-tab';
import Information from './UserInformation';
import List from "./ListView";
import Menu from '../../components/views/MenuBar';


export default class Universaltabs extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            image: ""


        };
    }


    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            Database.listenUserInfo(user.uid, (data)=> {
                this.setState({
                    fname: data.fname,
                    lname: data.lname,
                    image: data.image
                })
            });

            this.setState({
                uid: user.uid,
            });
        } catch (error) {
            alert(error);
        }
    }

    _editthings() {
        // console.log("task value",this.state.newTask);
        if (this.state.newTask === "") {
            return;
        }
        this.tasksRef.push({ name: this.state.newTask});
        this.setState({newTask: ""});
        alert("Task added successfully");
    }

    render() {
        let first_name = this.state.fname;
        let last_name = this.state.lname;

        return (

            <View style={styles.container13}>
                <StatusBar
                    //backgroundColor="red"
                    barStyle="light-content"
                />
                <Grid>
                    <Row  style={{
                        //paddingHorizontal: '4%',
                        //paddingVertical: '1%',
                        height: 210,
                        backgroundColor: '#BE3A31',
                        borderRadius: 10}} >
                        <Avatar style={styles.ImageUser}
                                xlarge
                                source={{uri: this.state.image}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                containerStyle={{
                                    //borderWidth:4,
                                    left:15,
                                    top:20,
                                    borderColor:'white'
                                }}

                        />

                        <Avatar style={styles.ImageUser}
                                large
                                source={{uri: "http://images2.fanpop.com/image/photos/9400000/Hello-puppies-9415183-1280-800.jpg"}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                containerStyle={{ left:15, top:20, }}
                                overlayContainerStyle={{backgroundColor: '#BE3A31'}}

                        />
                        <Avatar style={styles.ImageUser}
                                large
                                source={{uri: "http://1.bp.blogspot.com/-ekhKVXl7xto/T6-2WZMYpTI/AAAAAAAAGiQ/ioOs_2BfXPA/s1600/Images+for+Dog+:++Wallpaper+:+Cute+:+Funny+:+Beautiful+Puppies8.jpg"}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                containerStyle={{ left:-60, top:95, }}
                                overlayContainerStyle={{backgroundColor: '#BE3A31'}}


                        />
                        <Avatar style={styles.ImageUser}
                                large
                                source={{uri: "http://images4.fanpop.com/image/photos/14700000/So-cute-puppies-14749029-1600-1200.jpg"}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                containerStyle={{ left:-60, top:20, }}
                                overlayContainerStyle={{backgroundColor: '#BE3A31'}}

                        />

                        {/*<Avatar style={styles.ImageUser}*/}
                                {/*small*/}
                                {/*source={{uri: "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/German-Shepherd-Dog-2.jpg"}}*/}
                                {/*onPress={() => console.log("Works!")}*/}
                                {/*activeOpacity={0.7}*/}
                                {/*containerStyle={{ left: -60, top:20, }}*/}
                                {/*overlayContainerStyle={{backgroundColor: '#BE3A31'}}*/}
                        {/*/>*/}
                        <Avatar
                            large
                            icon={{name: 'add'}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{ left: -135, top: 95, }}

                        />
                        <Text style={styles.text13}>
                            {first_name} {last_name}
                        </Text>



                    </Row>

                    <Row>
                        <Tabs>
                            {/* First tab */}

                            <View title="About me" style={styles.content13}>
                                <Information/>
                            </View>

                            {/* Second tab */}

                            <View title=" Review" style={styles.content13}>
                                <List/>
                            </View>

                            {/* Third tab */}

                            <View title=" My Pets" style={styles.content13}>
                                <Text style={{
                                    textAlign: 'center',
                                    marginTop: '10%',
                                    fontSize: 15
                                }}
                                > No pets added.</Text>
                            </View>

                        </Tabs>

                    </Row>
                </Grid>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container13: {
        flex: 1,                            // Take up all screen
        backgroundColor: 'white',
        // Background color
    },
    container14: {
        // Take up all screen
        backgroundColor: '#BE3A31',
        height: 20,
        // Background color
    },
// Tab content container
    ImageUser: {
        flex: 1,
        position: 'absolute',
        borderColor: 'white',
        height: 50,
        width: 50,
        right: 15,
        borderWidth: 3,         // Darker background for content area
    },
    text13: {
        // Add horizontal margin
        color: '#fff', // Semi-transparent text
        fontFamily: 'Avenir',
        fontSize: 25,
        left: -436,
        top: 170,
        //textDecorationLine: 'underline',
        fontWeight: 'bold',

    },

});