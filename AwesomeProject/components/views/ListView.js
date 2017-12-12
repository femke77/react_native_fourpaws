import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'


class List extends Component {
    state = {
        names: [
            {
                id: 0,
                name: 'Alison',
                review: " I loved the service that fourpaws provide and the pet keeper was amazing! ",
                image:  { "uri": "https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg" },
            },
            {
                id: 1,
                name: 'Susan',
                review: " I loved the service that fourpaws provide and the pet keeper was amazing! ",
                image: { "url": "https://static.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg" },
            },
            {
                id: 2,
                name: 'Robert',
                review: " I loved the service that fourpaws provide and the pet keeper was amazing! ",
                image: { "url": "https://static.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
            },
            {
                id: 3,
                name: 'Mary',
                review: " I loved the service that fourpaws provide and the pet keeper was amazing! ",
                image: { "url": "https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg" },
            },

            {
                id: 4,
                name: 'Mary',
            },

            {
                id: 5,
                name: 'Mary',
            },
            {
                id: 6,
                name: 'Robert',
            },
            {
                id: 7,
                name: 'Mary',
            },

            {
                id: 8,
                name: 'Mary',
            },

            {
                id: 9,
                name: 'End',
            },
        ]
    }
    alertItemName = (item) => {
        alert(item.review)
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
export default List

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