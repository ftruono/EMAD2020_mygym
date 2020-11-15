import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
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
            esercizio: 'panca piana',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }, {
            esercizio: 'panca alta',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }]
    }, {
        day: 'day2',
        esercizi: [{
            esercizio: 'squat',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }, {
            esercizio: 'affondi',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }
        ]
    }, {
        day: 'day3',
        esercizi: [{
            esercizio: 'bicipiti',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }, {
            esercizio: 'tripiti',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }
        ]
    }, {
        day: 'day4',
        esercizi: [{
            esercizio: 'boh',
            ripetizioni: '5',
            colpi: '10',
            recupero: '30sec',
        }, {
            esercizio: 'boh2',
            ripetizioni: '5',
            colpi: '10',
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

                <FlatList style={{ margin: 10, flex: 0.5 }}
                    data={schedaDb}
                    scrollEnabled={true}
                    numColumns={2}
                    keyExtractor={(item, index) => item.day}
                    renderItem={({ item }) => (
                        <WorkoutCard scheda={item} {...this.props} />
                    )}
                />

                <Dieta {...this.props} isComponent={true} />
                <View style={styles.iconMessagge}>
                    <Icon
                        raised
                        name='comments'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => alert('La chat verrà implementata tra poco')} />
                </View>
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
    },
    iconMessagge: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'black',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },

});