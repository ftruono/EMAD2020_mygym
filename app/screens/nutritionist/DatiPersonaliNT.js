import React, { Component } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import BottoneNt from "../nutritionist/BottoneNT";
import AddAppuntamenti from "./AddAppuntamenti";
//import AddClienti from "./AddClienti";
import Feather from "react-native-vector-icons/Feather"

export default class DatiPersonaliNT extends React.Component {
    constructor(props) {
        super(props);
        this.getUser();
    }
    state = {
        noAppuntamenti:false,
        clienti: [],
        appuntamenti: [],
        visibleAddAppuntamenti: false,
        //visibleAddClienti: false,
        visibleDialog: false,
        ArrayClienti: [],
        //users: [],
        //uidClienti: []

    }
    showDialog = () => this.setState({ visibleDialog: true });

    hideDialog = () => this.setState({ visibleDialog: false });

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

    /* hidenAddClienti = () => {
        this.state.visibleAddClienti = false;
        this.setState({ visibleAddClienti: false })
    } */

    //1
    getUser = async () => {
        var uid = FirebaseAutentication.currentUser.uid
        const nt = (await Firestore.collection('UTENTI').doc(uid).get()).data();

        nt.clienti.map((e, i) => {
            this.getClienti(e);
        })
        if(nt.appuntamenti.length === 0) {
            this.setState({noAppuntamenti:true})
        } else {

            this.setState({ appuntamenti: pt.appuntamenti });
        }
    }

    //2
    getClienti = async (idCliente) => {
        const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

        this.state.clienti.push({ title: idCliente, username: utente.username });
        this.setState({ clienti: this.state.clienti });
    }

    /* addCliente = async () => {
        this.getUsers();
        this.state.visibleAddClienti = true;
        this.setState({ visibleAddClienti: true })
    } */

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
                this.state.users.push(user.username);
                this.state.uidClienti.push(idDocument[j])
            }
        }
        this.setState({ uidClienti: this.state.uidClienti });
        this.setState({ users: this.state.users });
    }

   

    getMyClienti = () => {

        this.state.clienti.map((e) => {
            this.state.ArrayClienti.push({ label: e.username, value: e.title })
        })

        this.setState({ ArrayClienti: this.state.ArrayClienti })
        console.log(this.state.ArrayClienti)
    };

    /* renderUser = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("PianiAlimentari", { atleta: item.title, username: item.username, routeProps: this.props }) }}>
                <Text style={styles.title}>{item.username}</Text>
            </TouchableOpacity>

        </View>
    ); */
    renderAppuntamenti = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity>
            <View style={styles.action}>
                <Feather name="book-open" color="#05375a" size={30}></Feather>
                <Text style={styles.title}>{this.state.clienti.map((e) => {
                    if (e.title === item.cliente) return e.username;
                })}</Text>
            </View>
                <Text>{new Date(item.giorno.toDate()).toDateString()} alle ore {new Date(item.giorno.toDate()).getHours()}</Text>
            
            </TouchableOpacity>
            <Icon
                size='35'
                name='trash'
                style={{marginTop:5}}
                type='font-awesome'
                color='#f50'
                onPress={() => {
                }}
            />
        </View>
    );
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Appuntamenti" />

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.titleParagraph}>I tuoi appuntamenti:</Text>
                    <TouchableOpacity onPress={() => alert('Refresh')} >
                        <MaterialIcons name="refresh" color="#05375a" size={25} style={{marginTop:25, marginLeft:30}}></MaterialIcons>
                    </TouchableOpacity>
                </View>

                {this.state.noAppuntamenti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora appuntamenti</Text>
                        <Text style={styles.titleThParagraph}> aggiungine dei nuovi con il bottone in fondo alla pagina</Text>

                        <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti}
                                        ArrayUid={this.state.uidClienti} {...this.props} />

                        <BottoneNt addAppuntamenti={this.addAppuntamenti} />

                    </>
            ):(
                    
                    <>
                            <FlatList style={{ margin: 10 }}
                                data={this.state.appuntamenti}
                                scrollEnabled={true}
                                keyExtractor={(item) => { item.id }}
                                refreshing={this._onRefresh}
                                renderItem={this.renderAppuntamenti}
                            />

                            <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti}
                            ArrayUid={this.state.uidClienti} {...this.props} />
                            
                            <BottoneNt addAppuntamenti={this.addAppuntamenti} />
                    </>
            )}

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
    item: {
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 25,
        marginLeft:10
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    titleParagraph: {
      fontSize:20,
      fontWeight:'bold',
      textAlign:'left',
      marginTop:25,
      marginLeft:15
    },
    titleSubParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:50,
     },
    titleThParagraph: {
         fontSize:15,
         fontWeight:'bold',
         textAlign:'center',
         marginTop:5
    }
});