import React, { Component } from 'react';
import {
    StyleSheet,         // CSS-like styles
    Text,               // Renders text
    TouchableOpacity,   // Pressable container
    View                // Container component
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';



export default class Tabs extends Component {

    // Initialize State
    state = {
        // First tab is active by default
        activeTab: 0
    };

    // Pull children out of props passed from App component
    render({ children } = this.props) {
        return (
            <View style={styles.container}>
                {/* Tabs row */}
                <View style={styles.tabsContainer}>
                    {/* Pull props out of children, and pull title out of props */}
                    {children.map(({ props: { title } }, index) =>
                        <TouchableOpacity
                            style={[
                                // Default style for every tab
                                styles.tabContainer,
                                // Merge default style with styles.tabContainerActive for active tab
                                index === this.state.activeTab ? styles.tabContainerActive : []
                            ]}
                            // Change active tab
                            onPress={() => this.setState({ activeTab: index }) }
                            // Required key prop for components generated returned by map iterator
                            key={index}
                        >
                            <Text style={styles.tabText}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* Content */}
                <View style={styles.contentContainer}>
                    {children[this.state.activeTab]}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Component container
    container: {
        flex: 56,



    },
    // Tabs row container
    tabsContainer: {
        justifyContent: 'center',

        flexDirection: 'row',
        paddingTop: -10,
        alignContent: 'flex-end',


    },
    // Individual tab container
    tabContainer: {
        flex: 1,
        paddingVertical: 5,
        borderColor:'#ffffff',
        borderWidth: 0.2,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',

    },
    // Active tab container
    tabContainerActive: {
        borderBottomColor: '#ffec01',
    },
    // Tab text
    tabText: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Content container
    contentContainer: {
        flex: 1
    }
});