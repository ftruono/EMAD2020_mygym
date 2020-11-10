import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

class MenuHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        console.log( this.props );
        return (
            <View>
                 <Button title="Open drawer" onPress={() => this.props.route.openDrawer()} />
            </View>
        );
    }
}

export default MenuHeader;