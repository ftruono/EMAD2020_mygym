import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon, ThemeConsumer } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';
import { Firestore } from "../../config/FirebaseConfig";
import Dieta from "../nutritionist/Dieta";



// dimension permette di accedere alle dimensioni della schermata
// su di essa si possono anche implementare dei metodi basta cercarli

const { width, height } = Dimensions.get('screen');

class HomeUser extends React.Component {
    constructor(props) {
        super(props);
        this.getUser()
    }
    state = {
        data:''
    }

    getUser = async () => {
            const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
            const scheda = (await Firestore.collection('SCHEDE').doc(user.schede[0]).get()).data();
            
            this.setState({data:scheda.days});

            const data= Object.keys(this.state.data).map((key) =>this.state.data[key])
            // console.log("scheda1->",data)
            const data1= Object.keys(scheda.days).map((key) =>scheda.days[key])
            // console.log("scheda2->",data1)

    }

    render() {
       
        return (

            <SafeAreaView style={styles.home}>
                <HeaderComponent {...this.props} title="Home" />
                <Text style={styles.titleParagraph}>Schede di Allenamento</Text>
                    <FlatList style={{ margin: 10, flex: 0.5 }}
                        data={Object.keys(this.state.data).map((key) =>this.state.data[key])}
                        scrollEnabled={true}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <WorkoutCard exercise={item} {...this.props} />
                        )}
                    /> 
                
                <Text style={styles.titleParagraph}>Dieta</Text>
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
    },
    iconMessagge: {
        paddingBottom:'10',
        textAlign: 'right',
        fontFamily: "Cochin"
    },
    titleParagraph: {
       fontSize:30,
       fontWeight:'bold',
       textAlign:'center',
       marginTop:25
    }

});