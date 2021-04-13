import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon, ThemeConsumer } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';
import { Firestore } from "../../config/FirebaseConfig";
import PianiAlimentari from "../nutritionist/PianiAlimentari";
import BottoneNt from "../nutritionist/BottoneNT";
import moment from 'moment';
import BottoneAddWorkOut from '../personaltrainer/BottoneAddWorkOut'
import AddAppuntamenti from "./AddAppuntamenti";
import AddClienti from "./AddClienti";

export default class DatiPersonaliNT extends React.Component {
    constructor(props) {
        super(props);
        this.getUser();
    }
    state = {
        clienti: [],
        appuntamenti: [],
        visibleAddAppuntamenti: false,
        visibleAddClienti: false,
        ArrayClienti: [],
        users: []

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
    hidenAddAppuntamenti = () => {
        this.state.visibleAddAppuntamenti = false;
        this.setState({ visibleAddAppuntamenti: false })
    }
    hidenAddClienti = () => {
        this.state.visibleAddClienti = false;
        this.setState({ visibleAddClienti: false })
    }
    //1
    getUser = async () => {
        const nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();

        nt.clienti.map((e, i) => {
            this.getClienti(e);
        })
        this.setState({ appuntamenti: nt.appuntamenti });
    }

    //2
    getClienti = async (idCliente) => {
        const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

        this.state.clienti.push({ title: idCliente, username: utente.username });
        this.setState({ clienti: this.state.clienti });
    }

    addCliente = async () => {
        this.getUsers();
        this.state.visibleAddClienti = true;
        this.setState({ visibleAddClienti: true })
    }

    addAppuntamenti = async () => {
        this.getMyClienti();
        this.state.visibleAddAppuntamenti = true;
        this.setState({ visibleAddAppuntamenti: true })
    }
    getUsers = async () => {
        const idDocument = [];

        const user = await Firestore.collection('UTENTI').get();

        for (let i = 0; i < user.docs.length; i++) {
            idDocument.push(user.docs[i].id);
        }

        for (let j = 0; j < idDocument.length; j++) {
            const user = (await Firestore.collection('UTENTI').doc(idDocument[j]).get()).data();
            if (user.username != undefined) {
                this.state.users.push({user: user.username, uid:idDocument[j] });
            }
        }
        
        this.setState({ users: this.state.users });
        console.log(this.state.users.lenght);
    }

    addPianoAlimentare = async () => {
        const today = moment().format("MMM Do YY");

        if (today === moment(this.state.date, true).format("MMM Do YY")) {
            alert("si prega di selezionare una data diversa da quella odierna");
        } else if (0 === this.state.arrayPasti.length) {
            alert("scrivere prima i pasti")
        } else {

            let user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
            const key = this.makeid(25);

            let support = []; support.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' })
            user.appuntamenti.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' });

            Firestore.collection(
                'UTENTI'
            ).doc(
                'PdlCUX3dqLNDqp4gcRD0awdAJ0t2'
            ).update({
                'diete': user.appuntamenti,
            }).then(() => {
                console.log('User updated!');
            });

            Firestore.collection(
                'DIETE'
            ).doc(
                key
            ).set({
                valori: this.state.arrayPasti,
                datainizio: new Date(),
                datafine: this.state.date
            });
        }
    };
    getMyClienti = () => {

        this.state.clienti.map((e) => {
            this.state.ArrayClienti.push({ label: e.username, value: this.makeid(10) })
        })

        this.setState({ ArrayClienti: this.state.ArrayClienti })
        console.log(this.state.ArrayClienti)
    };

    renderUser = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) }}>
                <Text style={styles.title}>{item.username}</Text>
            </TouchableOpacity>

        </View>
    );
    renderAppuntamenti = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => {
                alert("apri un modal con qualcosa s")
                // this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) 
            }}>

                <Text style={styles.title}>{this.state.clienti.map((e) => {
                    if (e.title === item.cliente) return e.username; else return "nome non trovato";
                })}</Text>
                <Text> data {new Date(item.giorno.toDate()).toDateString()}</Text>
            </TouchableOpacity>
            <Icon
                size='24'
                name='trash'
                type='font-awesome'
                color='#f50'
                onPress={() => {
                    // this.state.arrayPasti = [];
                    // this.state.formInput = [];

                    // this.setState({ arrayPasti: [] });
                    // this.setState({ formInput: [] });
                }}
            />
        </View>
    );
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Dati personali" />

                <Text>I tuoi utenti sono </Text>

                <FlatList style={{ margin: 10 }}
                    data={this.state.clienti}
                    scrollEnabled={true}
                    keyExtractor={(item) => { item.title }}
                    refreshing={this._onRefresh}
                    renderItem={this.renderUser}
                />

                <Text>I tuoi appuntamenti sono:</Text>
                <FlatList style={{ margin: 10 }}
                    data={this.state.appuntamenti}
                    scrollEnabled={true}
                    keyExtractor={(item) => { item.id }}
                    refreshing={this._onRefresh}
                    renderItem={this.renderAppuntamenti}
                />

                <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti} {...this.props} />
                <AddClienti hidenAddClienti={this.hidenAddClienti} visible={this.state.visibleAddClienti} ArrayClienti={this.state.users} {...this.props} />

                <BottoneNt addCliente={this.addCliente} addAppuntamenti={this.addAppuntamenti} />

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    appButtonSave: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        width: 120,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#ff6c16',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
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
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
});