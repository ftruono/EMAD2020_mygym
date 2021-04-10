import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent"
import ModalAddDati from './ModalAddDati';
import { Firestore } from "../../config/FirebaseConfig";
import { Icon } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"

// import nextId from 'react-id-generator';



export default class DatiPersonaliUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            misure: [],
            arrayMisurazioni: [],
            modify: false,
            username:''
        }
        this.getValori();
    }

    setModify = () =>{
        this.setState({modify:true})
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


    aggiungiValori = (nome, val) => {

        this.state.arrayMisurazioni.push({ tipo: nome, valore: val })
        var support = this.state.arrayMisurazioni;
        this.setState({ arrayMisurazioni: support });

    }

    addValori = async (evento) => {

        let user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
        const key = this.makeid(25);
        user.misure.push(key);

        Firestore.collection(
            'UTENTI'
        ).doc(
            '3hVSFBjPhuUUD9RWuNckZKVxpuz1'
        ).update({
            'misure': user.misure,
        }).then(() => {
            console.log('User updated!');
        });

        Firestore.collection(
            'MISURAZIONI'
        ).doc(
            key
        ).set({
            valori: this.state.arrayMisurazioni,
            data: new Date()
        });


        this.state.arrayMisurazioni.push({})
        var support = this.state.arrayMisurazioni;
        this.setState({ arrayMisurazioni: support });
    }

    modifyUsername = async () =>{
        this.setState({modify:false})
        Firestore.collection(
            'UTENTI'
        ).doc(
            '3hVSFBjPhuUUD9RWuNckZKVxpuz1'
        ).update({
            'username': this.state.username,
        }).then(() => {
            alert('Username updated!');
        }); 
    }

    getValori = async () => {
        const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
        console.log("user-> ", user.username);
        this.setState({username: user.username});
/*         const misure1 = (await Firestore.collection('MISURE').doc(user.misurazioni).get()).data();
        console.log("misure->", misure);
        this.setState({ misure: Object.keys(misure1.misurazioni).map((key) => misure1.misurazioni[key]) });

        for (let i = 0; i < this.state.misure.length; i++) {
            var support = this.state.misure[i];
            Firestore.collection('MISURAZIONI').doc(support[0]).get()
                .then((misure) => {
                    console.log("miurazioni->", misurazioni);
                    this.state.arrayMisurazioni.push(misure.data())
                    var support = this.state.arrayMisurazioni;
                    this.setState({ arrayMisurazioni: support })
                });
        } */
    }

    addElements = () => {
        this.setState({ addElement: true })
    }

    changeState = (status) => {
        this.setState({ addElement: status })
    }


    render() {
        return (
            <SafeAreaView style={styles.datiPersonali}>
                <HeaderComponent {...this.props} title="Dati Personali" />
                <ScrollView>
                    <View style={styles.container}>
                    <View style={styles.action}>
                        <Text style={styles.textUsername}>Username</Text>
                            <TouchableOpacity onPress={this.setModify} >
                                <FontAwesome name="pencil" color="#05375a" size={20} style={{marginTop:42, marginLeft:40}}></FontAwesome>
                            </TouchableOpacity>
                        {this.state.modify ? (
                            <>
                            <TouchableOpacity onPress={() => this.modifyUsername()}>
                                <Feather name="save" color="#05375a" size={20} style={{marginTop:42, marginLeft:50}}></Feather>
                            </TouchableOpacity>
                            </>
                        ):(
                            <>
                            
                            </>
                        )}
                        
                    </View>
                    <View style={styles.action}>
                        <Feather name="user" color="#05375a" size={30}></Feather>
                        <TextInput
                                placeholder="Username"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                editable={this.state.modify}
                                onChangeText={text => {this.setState({ username: text })}}
                                value={this.state.username}
                        />
                    </View>
                        <Text style={styles.textHeader}>Dati personali</Text>
                        {/* <View style={styles.action}>
                            <Text style={styles.textLogin}>Peso:</Text>
                            <TextInput
                                placeholder="Inserisci il peso"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"

                            />
                            <Text style={{ color: 'blue', textDecorationLine: "underline" }}>Vedi statistiche</Text>
                        </View> */}

                        <View style={{ marginTop: 15 }}>
                            <Card style={{ flex: 1 }}>
                                <Card.Title>Set Palestra</Card.Title>
                                <Card.Divider />
                                {this.state.arrayMisurazioni.map((e, i) => {
                                    return (
                                        <View style={{ flexDirection: 'row' }}>
                                            { 
                                            e.tipo == 'peso' ? <Text style={styles.textLogin}>{e.tipo}: {e.valore} Kg</Text>
                                                             :<Text style={styles.textLogin}>{e.tipo}: {e.valore} cm</Text>
                                            }
                                            <Text style={styles.textInput}></Text>
                                            <Icon
                                                size="24"
                                                name='trash'
                                                type='font-awesome'
                                                color='#f50'
                                                onPress={() => {
                                                    this.state.arrayMisurazioni.splice(i, 1);
                                                    var support = this.state.arrayMisurazioni;
                                                    this.setState({ arrayMisurazioni: support })
                                                }} />
                                        </View>
                                    );
                                })}
                            </Card>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.addValori() }}>
                    <Text style={styles.appButtonText}>Salva</Text>
                </TouchableOpacity>
                <ModalAddDati aggiungiValori={this.aggiungiValori}></ModalAddDati>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    datiPersonali: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 2,
        paddingHorizontal: 20,
        marginTop: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    textLogin: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: "bold"
    },
    textUsername: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
    },
    textHeader: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 100
    },
    textInput: {
        flex: 1,
        marginTop: 4,
        paddingLeft: 15,
        color: '#05375a',
        fontSize:25
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    appButtonContainer: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'black',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
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
    appButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});