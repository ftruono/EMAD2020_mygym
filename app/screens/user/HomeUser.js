import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeUser extends React.Component {
      constructor(props){
          super(props);
      }
    state = {}
    render() {
        return (
            <View>
                <Text>Sono un utente</Text>
                <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} />
            </View>
        );
    }
}

export default HomeUser;