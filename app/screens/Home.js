import React, {Component} from 'react';
import {View,Text, Button} from 'react-native';

class Home extends React.Component {
    state={}
    render() {
        return (
            <View>
               <Text>HomePage</Text>
               <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} />
            </View>
        );
    }
}

export default Home;