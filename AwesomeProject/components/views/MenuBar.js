import SideMenu from 'react-native-side-menu';
import Universaltabs from "./universaltabs";
import React, { Component, Props } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import Menu from '../data/MenuData.js';


const window = Dimensions.get('window');
export default class MenubarMain extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: true,
            selectedItem: 'Home',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;



        return (



            <SideMenu
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
                hiddenMenuOffset={10}

                toleranceY={10}
                menu={menu}


            >


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
