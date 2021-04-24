import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import moment from "moment";
import Feather from "react-native-vector-icons/Feather"

class HomePT extends React.Component {

  constructor(props) {
    super(props);
    this.getUser();
  }
  state = {
    noClienti: false,
    myClient: [],
    noAppuntamenti: false,
    itemList: [],
    appuntamenti: []
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


  getUser = async () => {
    var uid = FirebaseAutentication.currentUser.uid
    const pt = (await Firestore.collection('UTENTI').doc(uid).get()).data();

    if (pt.clienti.length === 0) {
      this.setState({ noClienti: true });
    } else {
      pt.clienti.map((e, i) => {
        this.getClienti(e);
      })
    }

    if (pt.appuntamenti.length === 0) {
      this.setState({ noAppuntamenti: true })
    } else {
      pt.appuntamenti.map((e) => {
        if (moment().format("MMM Do YY") === moment(e.giorno.toDate()).format("MMM Do YY")) {
          this.setState({ appuntamenti: Object.values(e) })
          this.renderTodayAppunt(e);
        } else {
          console.log(this.state.appuntamenti)
        }
      })
    }
  }

  getClienti = async (idCliente) => {
    const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();


    if (utente.schede[0] !== undefined) {
      const scheda = (await Firestore.collection('SCHEDE').doc(utente.schede[0]).get()).data();


      if ((scheda.dataScadenza.toDate()).getMonth() === new Date().getMonth()) {
        if ((scheda.dataScadenza.toDate()).getDate() >= new Date().getDate() && (scheda.dataScadenza.toDate()).getDate() <= (new Date().getDate() + 4)) {

            this.state.myClient.push({ id: this.makeid(5), title: idCliente, username: utente.username, dataScadenza: scheda.dataScadenza.toDate()});
            this.setState({ myClient: this.state.myClient });

        }
      }

      if (this.state.myClient.length === 0) {
        this.state.noClienti = true;
        this.setState({ noClienti: true });
      }

    }
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <View style={styles.action}>
          <MaterialIcons name="fitness-center" color="#05375a" size={25}></MaterialIcons>
          <Text style={styles.title}> {item.username}, la scheda scade {moment().local('IT'),moment(item.dataScadenza).format('l') }</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderTodayAppunt = (appuntamento) => {

    this.state.itemList.push(
      < View style={styles.action} >
        <Feather name="book-open" color="#05375a" size={20} style={{ marginLeft: 20 }}></Feather>
        <Text style={styles.title}> {appuntamento.nome} alle ore {new Date(appuntamento.giorno.toDate()).getHours()}</Text>
      </View >
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.home}>
        <HeaderComponent {...this.props} title="Home PT" />

        <Text style={styles.titleParagraph}>Clienti a cui aggiornare la scheda:</Text>

        {this.state.noClienti ? (
          <>
            <Text style={styles.titleSubParagraph}> Non hai clienti a cui aggiornare la scheda per i prossimi 4 giorni</Text>
          </>
        ) : (
          <>

            <FlatList style={{ margin: 10 }}
              data={this.state.myClient}
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
        ) : (
          <>

            <View>
              {this.state.appuntamenti.length === 0 &&
                <>
                  <Text style={styles.titleSubParagraph}>Non hai appuntamenti per oggi</Text>
                </>
              }

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


export default HomePT;

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