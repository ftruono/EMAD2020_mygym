import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';


// dimension permette di accedere alle dimensioni della schermata
// su di essa si possono anche implementare dei metodi basta cercarli

const { width, height } = Dimensions.get('screen');

const eventi = [
    {
        day: '2020-11-04',
        evento: [{
            titolo: 'Lezione',
            durata: '10 ore',
            descrizione: 'Link della lezione'
        }]
    }, {
        day: '2020-11-05',
        evento: [{
            titolo: 'Lezione',
            durata: '3 ore',
            descrizione: 'Link della lezione'
        }]
    }, {
        day: '2020-11-18',
        evento: [{
            titolo: 'Lezione',
            durata: '3 ore',
            descrizione: 'Link della lezione'
        }]
    }, {
        day: '2020-11-25',
        evento: [{
            titolo: 'Lezione',
            durata: '3 ore',
            descrizione: 'Link della lezione'
        }]
    },

];
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
        var eventoSelected =[];
        eventoSelected.push(eventi.find(item=>item.day=="2020-11-04"));
        console.log(eventoSelected.map((u)=> u.evento.map((u)=>u.durata)));
        return (
            
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Home" />
                
                {/* view dedicata alla visual delle schede di allenamento */}
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    <ScrollView>
                        <View sstyle={styles.boxStyle}>
                            <WorkoutCard scheda={JSON.stringify(schedaDb)} />
                        </View>
                    </ScrollView>


                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <Text> dimenisioni schermo {width}</Text>
                    {/* {console.log(eventi.map((u, i) => (u.evento.map((x)=> x.titolo))))} */}
                    

                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                        <View style={styles.boxStyle} />
                    </View>
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
    boxStyle: {
        height: 100, 
        width: 50, 
        borderWidth: 1, 
        backgroundColor: 'orange', 
        marginBottom: 5
      },
    scrollView: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginHorizontal: width / 150,
    },

});