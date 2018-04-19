import React, { Component } from 'react';
import {
    StyleSheet,         // CSS-like styles
    Text,               // Renders text
    TouchableOpacity,   // Pressable container
    View,
    Animated,
    Dimensions
    // Container component
} from 'react-native';

import MapView from 'react-native-maps';

//import PriceMarker from './AmountTag.js';

let id = 0;

const {width,height} = Dimensions.get('window');

const SCREEN_H= height;
const SCREEN_W= width;
const Ratio = width/height;

const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class Mapviews extends Component {
    constructor(props) {
        super(props);

    this.state = {
            initialRegion: {
                latitude: 34.24116,
                longitude: -118.5291,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },

        };

    }

    // watchID: ?number = null
    //
    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //             var lat = parseFloat(position.coords.latitude)
    //             var long = parseFloat(position.coords.longitude)
    //
    //             var initialRegion2 = {
    //                 latitude: lat,
    //                 longitude: long,
    //                 latitudeDelta: LATTITUDE_DELTA,
    //                 longitudeDelta: LONGITUDE_DELTA,
    //             }
    //             this.setState({initialRegion: initialRegion2})
    //
    //         },
    //         (error) => alert(JSON.stringify(error)),
    //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000})
    //     this.watchID = navigator.geolocation.watchPosition((position) => {
    //         var lat = parseFloat(position.coords.latitude)
    //         var long = parseFloat(position.coords.longitude)
    //
    //         var RegionLast = {
    //             latitude: lat,
    //             longitude: long,
    //             latitudeDelta: LATTITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA,
    //         }
    //         this.setState({initialRegion: RegionLast})
    //     })
    // }
    // componentWillUnmount(){
    //
    //         navigator.geolocation.clearWatch(this.watchID )
    //     }


    onRegionChange(initialRegion) {
        this.setState({ initialRegion });
    }


    // Pull children out of props passed from App component
    render() {

        return (
            <View style={styles.container}>
               <MapView
                   provider={this.props.provider}
                   style={styles.map}
                   initialRegion={this.state.initialRegion}
                   onPress={this.onMapPress}
               >
                        <PriceMarker/>

                </MapView>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Component container
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    radius2:{
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    // Tabs row container
    tabsContainer: {
        flexDirection: 'row',
        paddingTop: 30,
    },
    // Individual tab container
    tabContainer: {
        flex: 1,
        paddingVertical: 15,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    // Active tab container
    tabContainerActive: {
        borderBottomColor: '#ffec01',
    },
    // Tab text
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor:'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor:'#007AFF',


    },

    // Content container
    contentContainer: {
        flex: 1
    }
});