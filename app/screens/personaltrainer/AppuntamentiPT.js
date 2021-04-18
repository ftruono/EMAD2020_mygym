import React from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Icon } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather"
import HeaderComponent from "../../component/HeaderComponent";
import AddAppuntamenti from "../nutritionist/AddAppuntamenti";
import BottoneNt from "../nutritionist/BottoneNT";


export default class AppuntamentiPT extends React.Component {
    constructor(props) {
        super(props);
        this.getUser()
    }
    state = {
        noAppuntamenti:false,
        refreshAppuntamenti:false,
        clienti: [],
        appuntamenti: [],
        visibleAddAppuntamenti: false,
        visibleDialog: false,
        ArrayClienti: [],
    }

    showDialog = () => this.setState({ visibleDialog: true });

    hideDialog = () => this.setState({ visibleDialog: false });

    refreshPage = async () => {
        this.setState({refreshAppuntamenti:true})
        this.setState({appuntamenti: []})
        this.getUser();
      };

    hidenAddAppuntamenti = () => {
        this.state.visibleAddAppuntamenti = false;
        this.setState({ visibleAddAppuntamenti: false })
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
        const pt = (await Firestore.collection('UTENTI').doc(uid).get()).data();
        console.log(pt.clienti)
        if(this.state.refreshAppuntamenti === false) {
            if(pt.clienti.length === 0) {
            } else {
                pt.clienti.map((e, i) => {
                  this.getClienti(e)
                })
            }
        }
        if(pt.appuntamenti.length === 0) {
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

    addAppuntamenti = async () => {
        this.getMyClienti();
        this.state.visibleAddAppuntamenti = true;
        this.setState({ visibleAddAppuntamenti: true })
    }

    getMyClienti = () => {
        console.log(this.state.clienti)
        this.state.clienti.map((e) => {
            this.state.ArrayClienti.push({ label: e.username, value: e.title })
        })

        this.setState({ ArrayClienti: this.state.ArrayClienti })
        console.log(this.state.ArrayClienti)
    };

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

            <SafeAreaView style={styles.home}>
                <HeaderComponent {...this.props} title="Appuntamenti" />

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.titleParagraph}>I tuoi appuntamenti:</Text>
                    <TouchableOpacity onPress={() => this.refreshPage()} >
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
    item: {
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 25,
        marginLeft:10
    },
    titleParagraph: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 25,
        marginLeft: 15
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
    },
    home: {
        flex: 1,
        alignItems: 'stretch'
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    }
});