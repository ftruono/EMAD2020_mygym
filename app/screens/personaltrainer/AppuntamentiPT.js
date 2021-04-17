import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { Card } from 'react-native-elements';
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Feather from "react-native-vector-icons/Feather"

import HeaderComponent from "../../component/HeaderComponent";

import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import moment from "moment";


export default class AppuntamentiPT extends React.Component {
    constructor(props) {
        super(props);
        this.getUser()
    }
    state = {
        clienti: [],
        diete: [],
        appuntamenti: [],
        itemList: [],
    }
    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    //1
    getUser = async () => {
        var uid = FirebaseAutentication.currentUser.uid
        const nt = (await Firestore.collection('UTENTI').doc(uid).get()).data();
        nt.clienti.map((e, i) => {
            this.getClienti(e)
        })


    }

    //2
    getClienti = async (idCliente) => {
        const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

        utente.diete.map((e, i) => {
            this.getDiete(idCliente, e);
        })
        this.state.clienti.push({ id: this.makeid(5), title: idCliente, username: utente.username })

    }

    //3
    getDiete = async (idCliente, id) => {
        var valori = (await Firestore.collection('DIETE').doc(id).get()).data()

        this.state.diete.push({ 'cliente': idCliente, 'valori': valori })
        var support = this.state.diete;
        this.setState({ diete: support });

    }

    render() {

        return (

            <SafeAreaView style={styles.home}>
                <HeaderComponent {...this.props} title="Appuntamenti" />

                <Text style={styles.titleParagraph}>Ciao enzo</Text>



            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: 'transparent',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    titleParagraph: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 25,
        marginLeft: 15
    },
    titleSubParagraph: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 50,
        marginLeft: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    actionApp: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7,
        marginLeft: 10
    }
});