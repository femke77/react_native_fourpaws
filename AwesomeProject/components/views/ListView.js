import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import Database from '../firebase/database';
import * as firebase from "firebase";

//TODO only need alert if you force the size of the review boxes to stay the same. Right now they expand to show the whole review anyway so alert is redundant
//TODO SOME CODE IN HERE IS TO CREATE REVIEWS IN THE FIREBASE DB FIRST .. THIS IS A TEMP SOLUTION UNTIL A PAGE IS CREATED TO REVIEW SOMEONE
// review id is created automatically by push



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
            this.tempWriteToFirebase();

            Database.listenReviews(user.uid, (data)=> {
            this.setState({
                names: data
            })
            });

        } catch (error) {
            alert(error);
        }
    }



    tempWriteToFirebase ()  {

        Database.setReview(this.state.uid, '','Alison'," I loved the service that fourpaws provide blah blah and the pet keeper was amazing!" +
            " I loved the service that fourpaws provide blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", { "uri": "https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg" },
            'sDgzGISKnBQ4DmPv9RcJJyineJE2');
        Database.setReview(this.state.uid, '','Susan'," blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", { "url": "https://static.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg"},
            'vwpfytfNHbPTF24mKL0ggeptT3f1');
        Database.setReview(this.state.uid, '','Billy'," blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", { "url": "https://static.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg"},
            'vwpfytfNHbPTF24mKL0ggeptT3f1')
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

                                <Image style={styles.image}>
                                    source={{ uri: item.image }}
                                </Image>

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

        marginTop: 5,
        backgroundColor: '#fffff9',
        alignItems: 'center',
        width: 350,
        borderWidth:3,
        opacity: 0.8,


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
        paddingBottom: 260,
        paddingTop: 5,
        width: 350,
        height: 0,
    },
    text2: {
        color: '#ff7500',
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
})