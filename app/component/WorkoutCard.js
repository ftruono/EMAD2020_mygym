import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Dimensions } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('screen');

class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        var scheda = JSON.parse(this.props.scheda);
console.log(scheda.map((u, i) => (u.esercizi.map((x)=> u.esercizio1))));

        return (
            <View style={{ justifyContent:'flex-start',flexWrap:'wrap' }}>
                {            
                scheda.map((u, i) => (

                    <View style={{ width: width / 3, height: height / 4.5 }} >
                        <Card >
                            <Card.Title>{u.day}</Card.Title>
                            <Card.Divider />
                            {u.esercizi.map((u, i) => {
                                return (
                                    <View>
                                        <Text> esercizio: {i + 1}</Text>
                                        <Text>{u.esercizio1}</Text>
                                        <Text>{u.recupero}</Text>
                                        <Card.Divider />
                                    </View>
                                );
                            }

                            )}
                        </Card>
                    </View>
                ))}
            </View>

        )
    }
}
export default WorkoutCard;


