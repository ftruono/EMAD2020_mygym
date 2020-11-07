import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeNT extends React.Component {
      constructor(props){
          super(props);
      }
    state = {}
    render() {
        return (
            <View>
                <Text>Sono nutrizionista</Text>
                <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} />
            </View>
        );
    }
}

export default HomeNT;