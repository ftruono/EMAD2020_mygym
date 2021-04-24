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
            day: 0,
        }
        this.getExercise();
    }


    getExercise = async () => {
        const eseScheda = (await Firestore.collection('ESERCIZI').doc(this.props.exercise).get()).data();
        this.state.eserciziScheda = eseScheda.esercizi;
        this.setState({ eserciziScheda: this.state.eserciziScheda})
        console.log(this.state.eserciziScheda)
    }

    render() {

        if (this.state.eserciziScheda.length == 0) {
            return null
        } else {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("ViewSingleDay", { esercizi: this.state.eserciziScheda, routeProps: this.props }) }}>
                    <Card style={{ flex: 1 }}>
                        <Card.Title>Day {this.state.eserciziScheda[0].day}</Card.Title>
                        <Card.Divider />
                            {this.state.eserciziScheda.map((item,i) => {
                                return (
                                    <View style={styles.body}>
                                        <Text style={{fontWeight:'bold'}}>Esercizio {i+1}: </Text> 
                                        <Text>{item.esercizio}</Text>
                                        <Text> {item.ripetizioni} volte * {item.colpi} rip. </Text>
                                        <Text>{item.recupero} sec. di recupero</Text>
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
        height: '50%'
    },
    body: {
        alignItems: 'center',
        flex: 0.2,
    }
});