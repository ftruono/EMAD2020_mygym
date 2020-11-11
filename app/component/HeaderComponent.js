import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Header, withTheme } from 'react-native-elements';
import Icon from "react-native-vector-icons/Entypo";
import { SafeAreaView } from 'react-navigation';

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
              <Header size={90} backgroundColor='#ff6c16'
                    leftComponent={
                        <Icon name="menu" size={25} style={styles.iconMenu} onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={<Text style={styles.headerText}>{this.props.title}</Text>}
                />

            

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 90,
    },
    iconMenu: {
        color: '#fff'
    },
    headerText: {
        alignItems: 'flex-start',
        fontSize: 25,
        color: '#fff'

    }
});

export default HeaderComponent;