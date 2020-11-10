import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from "react-native-vector-icons/Entypo";

class HomePT extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />
                <Text>Sono un PT</Text>
                <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} />
            </View>
        );
    }
}

export default HomePT;