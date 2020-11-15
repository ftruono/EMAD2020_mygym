import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const { width, h } = Dimensions.get('screen');

class WorkoutCard extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
    }

    render() {

        var scheda = this.props.scheda;
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("ViewSingleDay", { scheda: scheda }) }}>
                    <Card style={{ flex: 1 }}>
                        <Card.Title>{scheda.day}</Card.Title>
                        <Card.Divider />
                        {scheda.esercizi.map((u, i) => {
                            return (
                                <View style={styles.body}>
                                    <Text>esercizio: {i + 1}</Text>
                                    <Text>{u.esercizio}</Text>
                                    <Text>{u.ripetizioni}*{u.colpi}</Text>
                                    <Text>{u.recupero}</Text>
                                    <Card.Divider />
                                </View>
                            );
                        }

                        )}
                    </Card>
                </TouchableOpacity>
            </View>

        )
    }



}
export default WorkoutCard;


const styles = StyleSheet.create({
    item: {
        width: width / 2,
        height: '30%'
    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});