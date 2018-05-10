import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import Database from '../firebase/database';
import * as firebase from "firebase";



//TODO only need alert if you force the size of the review boxes to stay the same. Right now they expand to show the whole review anyway so alert is redundant
//TODO SOME CODE IN HERE IS TO CREATE REVIEWS IN THE FIREBASE DB FIRST .. THIS IS A TEMP SOLUTION UNTIL A PAGE IS CREATED TO REVIEW SOMEONE
//TODO id in database is blank but IS sent correctly to List, not going to fix this until the reviews are done the final way



export default class List extends Component {


    constructor(props) {
        super(props);


        this.state = {
            names: [],
            uid: ""
        };



    }

    async componentDidMount(){

        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid,
            });

            Database.listenReviews(user.uid, (data)=> {
            this.setState({
                names: data
            })
            });

        } catch (error) {
            alert(error);
        }
    }



    alertItemName(item) {
        Alert.alert(
            item.name + ' says:',
            item.review,
            [
                {text:'OK', onPress: () =>
                    console.log('ok pressed')},
            ],
            {cancelable: true}
        )
    }

    render() {
        return (

            <View>

                <ScrollView style={styles.container36}>
                    {
                        this.state.names.map((item, index) => (
                            <TouchableOpacity
                                key = {item.id}
                                style = {styles.container}
                                onPress = {() => this.alertItemName(item)}>


                                <Text style = {styles.text}>
                                    {item.name}
                                </Text>
                                <Text style = {styles.text2}>
                                    {item.review}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

        )
    }
}


const styles = StyleSheet.create ({
    container: {
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#a0a0a0',
    },
    text: {
        color: '#000000',
        top: -10,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    container36: {
        //left: -1,
        //paddingBottom: 260,
        //width: window.width,
        //height: 200,
    },
    text2: {
        top: -10,
        textAlign: 'center',
        fontSize: 15,
    },
    image: {
        width:10,
        height: 10,
        top: -10,
        borderRadius: 20,
    },
});