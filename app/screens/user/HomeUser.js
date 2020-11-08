import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import WorkoutCard from '../../component/WorkoutCard';


// dimension permette di accedere alle dimensioni della schermata
// su di essa si possono anche implementare dei metodi basta cercarli

var dimensioni = Dimensions.get('window');

const schedaDb = [
    {
        day: 'day1',
        esercizi: [{
            esercizio1: 'panca piana 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'panca alta 5*10',
            recupero: '30sec',
        }]
    }, {
        day: 'day2',
        esercizi: [{
            esercizio1: 'squat 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'affondi5*10',
            recupero: '30sec',
        }
        ]
    }, {
        day: 'day3',
        esercizi: [{
            esercizio1: 'bicipiti 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'tripiti 5*10',
            recupero: '30sec',
        }
        ]
    }, {
        day: 'day4',
        esercizi: [{
            esercizio1: 'boh 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'boh2 5*10',
            recupero: '30sec',
        }
        ]
    },

];

class HomeUser extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {

        return (
            <SafeAreaView style={styles.container}>
                {/* view dedicata alla visual delle schede di allenamento */}
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <ScrollView style={styles.scrollView}>
                        <WorkoutCard scheda={schedaDb} />
                    </ScrollView>
                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    {/* <ScrollView style={styles.scrollView}>
                        <WorkoutCard params={scheda} />
                    </ScrollView> */}
                </View>
                


            </SafeAreaView>
        );
    }
}

export default HomeUser;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },

});