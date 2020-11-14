import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';
import Dieta from "../nutritionist/Dieta";


// dimension permette di accedere alle dimensioni della schermata
// su di essa si possono anche implementare dei metodi basta cercarli

const { width, height } = Dimensions.get('screen');


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

            <SafeAreaView style={styles.home}>
                <HeaderComponent {...this.props} title="Home" />
                    
                    <FlatList style={{ margin: 10,flex:0.5 }}
                        data={schedaDb}
                        scrollEnabled={true} 
                        numColumns={2}
                        keyExtractor={(item, index) => item.day}
                        renderItem={({ item }) => (
                            <WorkoutCard scheda={item} />
                        )}
                    />

                    <Dieta {...this.props} isComponent={true} />
           
            </SafeAreaView>
        );
    }
}

export default HomeUser;

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },

    boxStyle: {
        borderWidth: 1,
        backgroundColor: 'orange',
        marginBottom: 5
    },
    scrollView: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginHorizontal: width / 150,
    },
    title: {
        fontSize: 32,
    }

});