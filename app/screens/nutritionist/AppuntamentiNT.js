import React, { Component } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import PianiAlimentari from "./PianiAlimentari";
import BottoneNt from "./BottoneNT";
import AddAppuntamenti from "./AddAppuntamenti";
//import AddClienti from "./AddClienti";
import Feather from "react-native-vector-icons/Feather"
import moment from 'moment';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ConfirmDialog from "../../component/ConfirmDialog";

const { width, height } = Dimensions.get('screen');

export default class AppuntamentiNT extends React.Component {
    constructor(props) {
        super(props);
        this.getUser();
    }
    state = {
        noAppuntamenti: false,
        clienti: [],
        appuntamenti: [],
        visibleAddAppuntamenti: false,
        modify: false,
        visibleDialog: false,
        ArrayClienti: [],
        date: new Date(),
    }
    showDialog = () => this.setState({ visibleDialog: true });

    hideDialog = () => this.setState({ visibleDialog: false });

    refreshPage = async () => {
        this.setState({ noAppuntamenti: false });
        this.setState({ clienti: [] });
        this.setState({ appuntamenti: [] });
        this.setState({ ArrayClienti: [] });
        this.getUser();
    };

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    hidenAddAppuntamenti = (data, cliente) => {
        const uidFirebase = FirebaseAutentication.currentUser.uid;
        var check = false;
        if (data === undefined || cliente.id === undefined) {
            this.state.modify = false;
            this.setState({ modify: false });
            this.state.visibleAddAppuntamenti = false;
            this.setState({ visibleAddAppuntamenti: false });
        } else {
            if (this.state.modify) {

                this.state.appuntamenti.map((e, i) => {

                    if (moment(e.giorno.toDate()).format('YYYY-MM-DD HH:mm') === moment(data).format('YYYY-MM-DD HH:mm')) {
                        check = true;
                    } else if (cliente.id === e.id) {
                        this.state.appuntamenti[i] = ({ cliente: cliente.value, giorno: new Date(moment(data).format('YYYY-MM-DD HH:mm:ss')), id: this.makeid(10), nome: cliente.label });
                        this.setState({ appuntamenti: this.state.appuntamenti })

                        Firestore.collection(
                            'UTENTI'
                        ).doc(
                            uidFirebase
                        ).update({
                            'appuntamenti': this.state.appuntamenti,
                        }).then(() => {

                            this.refreshPage();
                            console.log("Modify");
                        });


                    }
                })
                if (check) {
                    this.state.visibleAddAppuntamenti = false;
                    this.setState({ visibleAddAppuntamenti: false });
                    alert("in quel giorno a quell'ora hai già un appuntamento");
                    this.state.visibleAddAppuntamenti = true;
                    this.setState({ visibleAddAppuntamenti: true });
                } else {
                    this.state.modify = false;
                    this.setState({ modify: false });
                    this.state.visibleAddAppuntamenti = false;
                    this.setState({ visibleAddAppuntamenti: false });
                    this.refreshPage();
                }

            } else {
                this.state.modify = false;
                this.setState({ modify: false });
                this.state.visibleAddAppuntamenti = false;
                this.setState({ visibleAddAppuntamenti: false });
                this.refreshPage();
            }
        }
    }

    //1
    getUser = async () => {
        const uid = FirebaseAutentication.currentUser.uid;
        const nt = (await Firestore.collection('UTENTI').doc(uid).get()).data();

        nt.clienti.map((e, i) => {
            this.getClienti(e);
        })
        if (nt.appuntamenti.length === 0) {
            this.setState({ noAppuntamenti: true });
        } else {

            this.setState({ appuntamenti: nt.appuntamenti });
        }
    }

    //2
    getClienti = async (idCliente) => {
        const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

        this.state.clienti.push({ title: idCliente, username: utente.username });
        this.setState({ clienti: this.state.clienti });
    }

    addAppuntamenti = async () => {
        this.state.ArrayClienti = [];
        this.setState({ ArrayClienti: this.state.ArrayClienti });

        this.getMyClienti(this.state.ArrayClienti);

        this.state.visibleAddAppuntamenti = true;
        this.setState({ visibleAddAppuntamenti: true });
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
                // this.state.uidClienti.push(idDocument[j])
            }
        }
        // this.setState({ uidClienti: this.state.uidClienti });
        this.setState({ users: this.state.users });
    }

    getMyClienti = () => {

        this.state.clienti.map((e) => {
            this.state.ArrayClienti.push({ label: e.username, value: e.title })
        })

        this.setState({ ArrayClienti: this.state.ArrayClienti })
        // console.log(this.state.ArrayClienti)
    };

    trash = (item) => {
        var support;
        const uid = FirebaseAutentication.currentUser.uid;

        // console.log("item", Object.values(item)[2])

        this.state.appuntamenti.map((e, i) => {
            // console.log(Object.values(e)[2])

            if (Object.values(item)[2] === Object.values(e)[2]) {
                support = i
                console.log("uguali")

            }
        })

        var supportArray = []

        this.state.appuntamenti.map((e, i) => {
            if (support != i) {
                supportArray.push(e)
            }
        })

        Firestore.collection(
            'UTENTI'
        ).doc(
            uid
        ).update({
            'appuntamenti': supportArray,
        }).then(() => {
            this.refreshPage();
            console.log('User updated!');
        });

    }

    modify = (item) => {
        //gli passo la data
        this.setState({ date: item.giorno });

        //svuoto l'array
        this.state.ArrayClienti = [];
        this.setState({ ArrayClienti: this.state.ArrayClienti });
        //gli assegno solo il cliente che devo modificare
        this.state.ArrayClienti.push({ label: item.nome, value: item.cliente, id: item.id });
        this.setState({ ArrayClienti: this.state.ArrayClienti });
        //gli dico che sto in modalità modifica
        this.state.modify = true;
        this.setState({ modify: this.state.modify });
        //apro il modal
        this.state.visibleAddAppuntamenti = true;
        this.setState({ visibleAddAppuntamenti: true });

    }

    renderAppuntamenti = ({ item }) => (
        <View style={[styles.item, { flexDirection: "row" }]}>
            <View style={ { flex: 3 }}>
                <TouchableOpacity>
                    <View style={[styles.action, { flex: 1 }]}>
                        <Feather name="book-open" color="#05375a" size={30}></Feather>
                        <Text style={styles.title}>{this.state.clienti.map((e) => {
                            if (e.title === item.cliente) return e.username;
                        })}</Text>
                    </View>
                    {/* {console.log(Object.values(item.giorno))} */}


                    {Object.values(item.giorno)[1] != null ? (
                        <>
                            <Text>{moment(new Date(item.giorno.toDate())).format('LLLL')}</Text>

                        </>) : (<>
                            <Text>Errore nel caricamento si prega di ricaricare la pagina</Text>
                        </>)}
                </TouchableOpacity>
            </View>

            <View style={[styles.item, { flex: 1 }]}>
                <View style={styles.item}>

                    <Icon
                        size={width > 500 ? 30 : width / 17}
                        name='pencil'
                        style={{ marginTop: 5 }}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => {
                            this.modify(item)
                        }}
                    />
                </View>
                <View style={styles.item}>


                    <Icon
                        size={width > 500 ? 30 : width / 17}
                        name='trash'
                        style={{ marginTop: 5 }}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => {
                            this.trash(item)
                        }}
                    />
                </View>
            </View>
        </View>

    );

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Appuntamenti" />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleParagraph}>I tuoi appuntamenti:</Text>
                    <TouchableOpacity onPress={() => this.refreshPage()} >
                        <MaterialIcons name="refresh" color="#05375a" size={25} style={{ marginTop: 25, marginLeft: 30 }}></MaterialIcons>
                    </TouchableOpacity>
                </View>

                {this.state.noAppuntamenti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora appuntamenti</Text>
                        <Text style={styles.titleThParagraph}> aggiungine dei nuovi con il bottone in fondo alla pagina</Text>

                        <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti}
                            date={!this.state.modify ? new Date() : this.state.date} modify={this.state.modify} {...this.props} />

                        <BottoneNt addAppuntamenti={this.addAppuntamenti} />

                    </>
                ) : (

                    <>
                        <FlatList style={{ margin: 10 }}
                            data={this.state.appuntamenti}
                            scrollEnabled={true}
                            keyExtractor={(item) => { item.id }}
                            refreshing={this._onRefresh}
                            renderItem={this.renderAppuntamenti}
                        />

                        <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti}
                            date={!this.state.modify ? new Date() : this.state.date} modify={this.state.modify} {...this.props} />
                        <ConfirmDialog />
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
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 25,
        marginLeft: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
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
    titleThParagraph: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5
    }
});