import React, { Component } from 'react';
import {
    StyleSheet,         // CSS-like styles
    Text,               // Renders text
    TouchableOpacity,   // Pressable container
    View                // Container component
} from 'react-native';

import MapView from 'react-native-maps';
export default class Mapviews extends Component {



    // Pull children out of props passed from App component
    render() {
        return (
            <View style={styles.container}>
               <MapView
                   style={styles.map}
                   initialRegion={{
                       latitude: 34.24116,
                       longitude: -118.5291,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                   }}>
                    <MapView.Marker
                    coordinate={{
                        latitude: 34.24116,
                        longitude: -118.5291,
                    }}
                    >
                        <View style={styles.radius}>
                            <View style={styles.marker}     />
                        </View>
                    </MapView.Marker>
                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Component container
    container: {
        flex: 1,
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        position:'absolute',
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