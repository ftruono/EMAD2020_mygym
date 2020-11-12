import React, { Component } from 'react'
import { Platform, StyleSchet, Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Card, ListItem, Icon } from 'react-native-elements';
import { Modal } from 'react-native-paper';

const scheda = () => {
    return (<View style={styles.item}>
        <Card style={{ flex: 1 }}>
            <Card.Title>{scheda.day}</Card.Title>
            <Card.Divider />
            {scheda.esercizi.map((u, i) => {
                return (
                    <View style={styles.body}>
                        <Text>esercizio: {i + 1}</Text>
                        <Text>{u.esercizio1}</Text>
                        <Text>{u.recupero}</Text>
                        <Card.Divider />
                    </View>
                );
            }

            )}
        </Card>
    </View>);
}


export default class Scheda extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        var schedaArray = this.props.scheda;
        return (
            <Card style={{ flex: 1 }}>
                <Card.Title></Card.Title>
                <Card.Divider />
                {/* {scheda.esercizi.map((u, i) => { */}
                {/* return ( */}
                <View >
                    <Text>{schedaArray.day}</Text>
                    <TextInput style={{ height: 60, width: 100, borderColor: 'gray', borderWidth: 1 }}>

                    </TextInput>

                    <Card.Divider />
                </View>
            </Card>

            /* <TextInput
                    style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
                />
                <TouchableOpacity >
                    <Text >D</Text>

                </TouchableOpacity> */

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