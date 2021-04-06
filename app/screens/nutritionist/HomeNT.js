import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon, ThemeConsumer } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';
import { Firestore } from "../../config/FirebaseConfig";
import Dieta from "../nutritionist/Dieta";


export default class HomeNT extends React.Component {
  constructor(props) {
    super(props);
    this.getUser()
  }
  state = {
    clienti: [],
    diete: [],
    data: ''
  }

  getUser = async () => {
    const nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();
    nt.clienti.map((e, i) => {
      this.getClienti(e)
    })
  }

  getClienti = async (idCliente) => {
    const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

    utente.dieta.map((e, i) => {
      this.getDiete(idCliente, e)
    })
  }

  getDiete = async (idCliente, id) => {
    var valori = (await Firestore.collection('DIETE').doc(id).get()).data()


    this.state.diete.push({ 'cliente': idCliente, 'valori': valori })
    var support = this.state.diete;
    this.setState({ diete: support });

  }

  render() {
    var support=this.state.diete[0];
    // console.log(Object.values(support))
    // var support = [];
    // this.state.diete.map((e, i) => {
      // var data = (Object.values(e.valori));
      // data.map((e, i) => {
        // if(e[1]= new Date()){
          // console.log
        // }
      // })
    // });
    return (

      <SafeAreaView style={styles.home}>
        <HeaderComponent {...this.props} title="Home" />
        <Text>Gli utenti a cui dei aggiornare la dieta sono</Text>

        {/* <FlatList style={{ margin: 10, flex: 0.8, alignContent: 'center' }}
          data={support}
          scrollEnabled={true}
          numColumns={2}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <DietaComponent {...this.props} item={item} key={item.nome} />
          )}
        /> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({

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

