import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import PianiAlimentari from "./PianiAlimentari";
import Feather from "react-native-vector-icons/Feather"
import AddClienti from "./AddClienti";
import BottoneNtClienti from "../nutritionist/BottoneNtClienti";

export default class ListaUtenti extends React.Component {
  constructor(props) {
    super(props);
    this.getUser()
  }
  state = {
    clienti: [],
    diete: [],
    misure: [],
    visibleAddClienti: false,
    users: [],
    uidClienti: []
  }

  hidenAddClienti = () => {
        this.state.visibleAddClienti = false;
        this.setState({ visibleAddClienti: false })
  }

  addCliente = async () => {
        this.getUsers();
        this.state.visibleAddClienti = true;
        this.setState({ visibleAddClienti: true })
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
                this.state.users.push(user.username);
                this.state.uidClienti.push(idDocument[j])
            }
        }
        this.setState({ uidClienti: this.state.uidClienti });
        this.setState({ users: this.state.users });
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
    utente.misure.map((e, i) => {
      this.getMisure(e)
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

  getMisure = async (id) => {
    const valori = (await Firestore.collection('MISURAZIONI').doc(id).get()).data();

    this.state.misure.push(valori)
    var support = this.state.misure;
    this.setState({ misure: support });

  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => { this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) }}>
        <View style={styles.action}>
            <Feather name="user" color="#05375a" size={20}></Feather>
            <Text style={styles.title}> {item.username}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  render() {

    return (

      <SafeAreaView style={styles.container}>
        <HeaderComponent {...this.props} title="Lista Clienti" />
        <Text style={styles.titleParagraph}>I miei clienti:</Text>
        
        <FlatList style={{ margin: 10 }}
          data={this.state.clienti}
          scrollEnabled={true}
          keyExtractor={(item) => item.id}
          refreshing={this._onRefresh}
          renderItem={this.renderItem}
        />

        <AddClienti hidenAddClienti={this.hidenAddClienti} visible={this.state.visibleAddClienti} ArrayClienti={this.state.users}
                ArrayUid={this.state.uidClienti}  {...this.props} />

        <BottoneNtClienti addCliente={this.addCliente} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  titleParagraph: {
      fontSize:20,
      fontWeight:'bold',
      textAlign:'left',
      marginTop:25,
      marginLeft:15
  },
  action: {
      flexDirection: 'row',
      marginTop: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 7
  },
  container: {
      flex: 1,
      alignItems: 'stretch'
  }
});