import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Dimensions } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

const { width, h } = Dimensions.get('screen');

class WorkoutCard extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        const styles = StyleSheet.create({
            item: {
                width: width/2,
                height: '30%' 
            },
            body:{
                alignItems:'center', 
                flex:0.8
            }
        });
        var scheda = this.props.scheda;

        return (
            <View style={styles.item}>
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
            </View>

        )
    }



}
export default WorkoutCard;


