import { firestore } from "firebase";
import React, { Component, useState, useEffect } from "react";
import { Card } from 'react-native-elements';
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Feather from "react-native-vector-icons/Feather"

import HeaderComponent from "../../component/HeaderComponent";

import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import moment from "moment";


export default class HomeNT extends React.Component {
  constructor(props) {
    super(props);
    this.getUser()
  }
  state = {
    noClienti:false,
    noAppuntamenti:false,
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
    if(nt.clienti.length === 0) {
      this.setState({noClienti:true})
  } else {
    nt.clienti.map((e, i) => {
      this.getClienti(e)
    })
  }

  if(nt.appuntamenti.length === 0) {
    this.setState({noAppuntamenti:true})
} else {
    nt.appuntamenti.map((e) => {
      if (moment().format("MMM Do YY") === moment(e.giorno.toDate()).format("MMM Do YY")) {
        this.setState({appuntamenti:Object.values(e)})
        this.renderItemList(e);
      } else{
        
        console.log(this.state.appuntamenti)
      }
    })
}
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
  renderItemList = (appuntamento) => {

    this.state.itemList.push(
      < View style={styles.action} >
        <Feather name="book-open" color="#05375a" size={20} style={{ marginLeft: 20 }}></Feather>

        <Text style={styles.title}> {appuntamento.nome} alle ore {new Date(appuntamento.giorno.toDate()).getHours()}</Text>
      </View >
    )
  }
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => { console.log(item), this.props.navigation.navigate("PianiAlimentari", { uid: item.title, username: item.username, routeProps: this.props }) }}>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20}></Feather>
          <Text style={styles.title}> {item.username}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  render() {

    return (

      <SafeAreaView style={styles.home}>
        <HeaderComponent {...this.props} title="Home" />

        <Text style={styles.titleParagraph}>Dieta in scadenza a:</Text>

        {this.state.noClienti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora clienti</Text>
                    </>
            ):(
                    <>

                        <FlatList style={{ margin: 10 }}
                          data={this.state.clienti}
                          scrollEnabled={true}
                          keyExtractor={(item) => item.id}
                          refreshing={this._onRefresh}
                          renderItem={this.renderItem}
                        />
                    </>
            )}

        <Card.Divider />

        <Text style={styles.titleParagraph}>Lista di Appuntamenti Odierni:</Text>
        
        {this.state.noAppuntamenti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora appuntamenti</Text>
                    </>
            ):(
                    <>
                        <View>
                          {this.state.appuntamenti.length === 0 && <>
                            <Text style={styles.titleSubParagraph}>Non hai appuntamenti per oggi</Text>
                          </>}
                          {this.state.itemList.map((value, index) => {
                            return value
                          })}
                        </View>
                    </>
            )}

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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginLeft: 15,
    paddingBottom:25
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