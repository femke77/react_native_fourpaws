import SideMenu from 'react-native-side-menu';
import Universaltabs from "./universaltabs";
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Menu from '../data/MenuData.js';


const window = Dimensions.get('window');
export default class MenubarMain extends Component {
    render() {
        const menu = <Menu/>;

        return (
            <SideMenu
                //isOpen={true}
                hiddenMenuOffset={10}

                toleranceY={10}
                menu={menu}


            >
                <Universaltabs/>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'red',
        padding: 20,
    },
});
