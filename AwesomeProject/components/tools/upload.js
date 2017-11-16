import React, { Component } from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     Button,
//     Image,
//     ActivityIndicator,
//     TouchableOpacity
// } from 'react-native';
import {
    StyleSheet,
    View,
    Button,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dp: null
        }
    }
    openPicker(){
        this.setState({ loading: true });
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        //const { uid } = this.state.user
        const uid = "12345";

        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            //mediaType: 'photo'
        }).then(image => {

            const imagePath = image.path;

            let uploadBlob = null;

            const imageRef = firebase.storage().ref(uid).child("dp.jpg");
            let mime = 'image/jpg';
            fs.readFile(imagePath, 'base64')
                .then((data) => {
                    //console.log(data);
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime });
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {

                    //let userData = {};
                    //userData[dpNo] = url
                    //firebase.database().ref('users').child(uid).update({ ...userData})

                    let obj = {};
                    obj["loading"] = false;
                    obj["dp"] = url;
                    this.setState(obj);
                })
                .catch((error) => {console.log(error)});
        })
        .catch((error) => {console.log(error)});
    }
    render() {
        const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }>
            <Image
                style={{width: 100, height: 100, margin: 5}}
                source={{uri: this.state.dp}}/>
            </TouchableOpacity>) : (<Button onPress={ () => this.openPicker() }
            title={ "Upload User Profile Image" }/>);

        const dps = this.state.loading ?
            <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
                <View style={{flexDirection: "row"}}>
                    { dpr }
                </View>
            </View>);

        return (
            <View style={styles.container}>{ dps }</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});