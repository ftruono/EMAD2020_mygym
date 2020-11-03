import React, {Component} from 'react';
import {View,Text} from 'react-native';

class Home extends Component {
    state={}
    render() {
        return (
            <View style= {styles.container}>
               <Text style = {styles.textLogin}>HomePage</Text>
            </View>
        );
    }
}

export default Home;