import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import HeaderComponent from "../../component/HeaderComponent";

import { Firestore } from "../../config/FirebaseConfig";


export default class HomeNT extends React.Component {
  constructor(props) {
    super(props);
    this.getUser()
  }
  state = {
    clienti: [],
    diete: [],
    misure: [],
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
    const nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();
    nt.clienti.map((e, i) => {
      this.getClienti(e)
    })
  }

  //2
  getClienti = async (idCliente) => {
    const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

    // utente.diete.map((e, i) => {
    //   this.getDiete(idCliente, e);
    // })
    // utente.misure.map((e, i) => {
    //   this.getMisure(e)
    // })
    this.state.clienti.push({ id: this.makeid(5), title: idCliente, username: utente.username })

  }

  //3
  getDiete = async (idCliente, id) => {
    var valori = (await Firestore.collection('DIETE').doc(id).get()).data()

    this.state.diete.push({ 'cliente': idCliente, 'valori': valori })
    var support = this.state.diete;
    this.setState({ diete: support });

  }

  getMisure = async (id) => {
    const valori = (await Firestore.collection('MISURAZIONI').doc(id).get()).data();

    this.state.misure.push(valori)
    var support = this.state.misure;
    this.setState({ misure: support });

  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => { console.log(item),this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) }}>
        <Text style={styles.title}>{item.username}</Text>
      </TouchableOpacity>

    </View>
  );
  render() {

    return (

      <SafeAreaView style={styles.home}>
        <HeaderComponent {...this.props} title="Home" />
        <Text>Gli utenti a cui dei aggiornare la dieta sono</Text>
        
        <FlatList style={{ margin: 10 }}
          data={this.state.clienti}
          scrollEnabled={true}
          keyExtractor={(item) => item.id}
          refreshing={this._onRefresh}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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