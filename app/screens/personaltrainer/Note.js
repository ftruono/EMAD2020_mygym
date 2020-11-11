import React, { Component } from 'react'
import { StyleSchet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

export default class Note extends React.Component {
    render() {
        return (
            <View key={this.props.keyval} style={{
                position: 'relative',
                padding: 20,
                paddingRight: 100,
                borderBottomColor: '#ededed',
            }}>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
                <TouchableOpacity >
                    <Text >D</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

// const styles=StyleSheet.create({
//     note:{
//         position:'relative',
//         padding:20,
//         paddingRight:100,
//         borderBottomColor:'#ededed',
//     },
//     noteText:{
//         paddingLeft:20,
//         borderLeftWidtg:10,

//     }
// });