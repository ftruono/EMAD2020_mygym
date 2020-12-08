import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Firestore } from "../config/FirebaseConfig";

const { width, h } = Dimensions.get('screen');


class WorkoutCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eserciziScheda: [],
            index: 0
        }
        this.getExercise();
    }


    getExercise = () => {
        for (let i = 0; i < this.props.exercise.length; i++) {
            Firestore.collection('ESERCIZI').doc(this.props.exercise[i]).get()
                .then((esercizi) => {
                    this.state.eserciziScheda.push(esercizi.data())
                    var support = this.state.eserciziScheda;
                    this.setState({ eserciziScheda: support})
                });
        }
    }

    render() {

        if (this.state.eserciziScheda.length == 0) {
            return null
        } else {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("ViewSingleDay", { esercizi: this.state.eserciziScheda, routeProps: this.props }) }}>
                    <Card style={{ flex: 1 }}>
                        <Card.Title>{this.state.eserciziScheda[0].day}</Card.Title>
                        <Card.Divider />
                            {this.state.eserciziScheda.map((item,i) => {
                                return (
                                    <View style={styles.body}>
                                        <Text>Esercizio {i+1}: </Text> 
                                        <Text>{item.nome}</Text>
                                        <Text> {item.ripetizioni}*{item.colpi} </Text>
                                        <Text>{item.recupero}</Text>
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
}
export default WorkoutCard;


const styles = StyleSheet.create({
    item: {
        width: width / 2 - 10,
        height: '30%'
    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});