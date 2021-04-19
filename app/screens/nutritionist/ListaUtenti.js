import React from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AddClienti from "./AddClienti";
import BottoneNtClienti from "../nutritionist/BottoneNTClienti";
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import ConfirmDialog from "../../component/ConfirmDialog";


export default class ListaUtenti extends React.Component {
  constructor(props) {
    super(props);
    this.getUser()
  }
  state = {
    noClienti: false,
    clienti: [],
    diete: [],
    misure: [],
    visibleAddClienti: false,
    users: [],
    uidClienti: [],
    visibleDialogConfirm: false,
    userDelte: null,
    textConfirm: null,
  }

  hidenAddClienti = () => {
    this.state.visibleAddClienti = false;
    this.setState({ visibleAddClienti: false })
  }
  hidenConfirmDialog = () => {
    this.state.visibleDialogConfirm = false;
    this.setState({ visibleDialogConfirm: false })
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

  refreshPage = async () => {
    this.setState({ noClienti: false }),
    this.setState({ clienti: [] });
    this.getUser();

  };
  //1
  getUser = async () => {
    const uid = FirebaseAutentication.currentUser.uid;
    const nt = (await Firestore.collection('UTENTI').doc(uid).get()).data();
    if (nt.clienti.length === 0) {
      this.setState({ noClienti: true })
    } else {
      nt.clienti.map((e, i) => {
        this.getClienti(e)
      })
    }
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

  deleteUser = async () => {
    var support;
    const uid = FirebaseAutentication.currentUser.uid;

    this.state.clienti.map((e, i) => {
      if (Object.values(this.state.userDelete)[1] === Object.values(e)[1]) {
        support = i;
        console.log("uguali");
      }
    })

    var supportArray = [];

    this.state.clienti.map((e, i) => {
      if (support != i) {
        supportArray.push(Object.values(e)[1]);
      }
    })

    Firestore.collection(
      'UTENTI'
    ).doc(
      uid
    ).update({
      'clienti': supportArray,
    }).then(() => {
      this.refreshPage();
      this.hidenConfirmDialog();
    });


  }

  renderItem = ({ item }) => (
    <View style={styles.item}>

      <TouchableOpacity onPress={() => { this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) }}>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20}></Feather>
          <Text style={styles.title}> {item.username}</Text>
        </View>
      </TouchableOpacity>

      <Icon
        size='35'
        name='trash'
        style={{ marginTop: 5 }}
        type='font-awesome'
        color='#f50'
        onPress={() => {
          this.setState({ userDelete: item });
          this.setState({ textConfirm: "sei sicuro di voler eliminare l'utente "+ Object.values(item)[2] +" dalla tua lista?"});
          this.setState({ visibleDialogConfirm: true });
        }}
      />

    </View>
  );

  render() {

    return (

      <SafeAreaView style={styles.container}>
        <HeaderComponent {...this.props} title="Lista Clienti" />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.titleParagraph}>I miei clienti:</Text>
          <TouchableOpacity onPress={() => this.refreshPage()} >
            <MaterialIcons name="refresh" color="#05375a" size={25} style={{ marginTop: 25, marginLeft: 30 }}></MaterialIcons>
          </TouchableOpacity>
        </View>

        {this.state.noClienti ? (
          <>
            <Text style={styles.titleSubParagraph}> Non hai ancora clienti</Text>
            <Text style={styles.titleThParagraph}> aggiungine dei nuovi con il bottone in fondo alla pagina</Text>

            <AddClienti hidenAddClienti={this.hidenAddClienti} visible={this.state.visibleAddClienti} ArrayClienti={this.state.users}
              ArrayUid={this.state.uidClienti} refreshPage={this.refreshPage} {...this.props} />

            <BottoneNtClienti addCliente={this.addCliente} />

          </>) : (<>

            <FlatList style={{ margin: 10 }}
              data={this.state.clienti}
              scrollEnabled={true}
              keyExtractor={(item) => item.id}
              refreshing={this._onRefresh}
              renderItem={this.renderItem}
            />

            <AddClienti hidenAddClienti={this.hidenAddClienti} visible={this.state.visibleAddClienti} ArrayClienti={this.state.users}
              ArrayUid={this.state.uidClienti} refreshPage={this.refreshPage}  {...this.props} />

            <ConfirmDialog visible={this.state.visibleDialogConfirm} hidenConfirmDialog={this.hidenConfirmDialog}
              check={this.deleteUser} 
              text={this.state.textConfirm != null ? this.state.textConfirm : '' } {...this.props} />

            <BottoneNtClienti addCliente={this.addCliente} />
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
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  titleParagraph: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 25,
    marginLeft: 15
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
  },
  titleSubParagraph: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  titleThParagraph: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  }
});