import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList,Dimensions } from 'react-native';
import { Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { RefreshControl, SafeAreaView } from 'react-navigation';
import HeaderComponent from "../../component/HeaderComponent";
import BottoneAddWorkOut from './BottoneAddWorkOut';
import Scheda from './Scheda';
import DropDownPicker from 'react-native-dropdown-picker';
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";

const { width, height } = Dimensions.get('screen');
var selectDay;
class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clienti:[],
            schedaArray: [],
            arrayClienti:[],
            userSelected:''
        };
        this.getUser();
    }

    addDay = () => {
        let lunghezza = this.state.schedaArray.length;
        this.state.schedaArray.push({ day: lunghezza, esercizi: [] });
        var support = this.state.schedaArray;
        selectDay = lunghezza;
        this.setState({ schedaArray: support });
    };

    addEsercizio = () => {
        this.state.schedaArray[selectDay].esercizi.push({ esercizio: '', ripetizioni: '', colpi: '', recupero: '' })
        var support = this.state.schedaArray;
        this.setState({ schedaArray: support });
        console.log(this.state.schedaArray)
    }

    aggiungiValori = (daySelect, num, eser, valori) => {
        console.log("day ricevuti->" + daySelect);
        console.log("valori ricevuti->" + valori);
        switch (eser) {
            case '0':
                this.state.schedaArray[daySelect].esercizi[num].esercizio = valori;
                break;
            case '1':
                this.state.schedaArray[daySelect].esercizi[num].ripetizioni = valori;
                break;
            case '2':
                this.state.schedaArray[daySelect].esercizi[num].colpi = valori;
                break;
            case '3':
                this.state.schedaArray[daySelect].esercizi[num].recupero = valori;
                break;
            default:
                alert("si è verificato un errore, si prega di riprovare e se l'errore persiste contattare l'assistenza");
        }
        var support = this.state.schedaArray;
        this.setState({ schedaArray: support });
        console.log(this.state.schedaArray)
    }

    daySelected = (day) => {
        selectDay = day;
        console.log(selectDay);
    }

    selectUser = (item) => { 
        var user = Object.values(item)[1];
        this.state.userSelected = user
        this.setState({userSelected:this.state.userSelected})
    }

    getUser = async () => {
        var uid = FirebaseAutentication.currentUser.uid
        const pt = (await Firestore.collection('UTENTI').doc(uid).get()).data();

        if(pt.clienti.length === 0) {
            this.setState({arrayClienti:[]})
        } else {
            pt.clienti.map((e, i) => {
              this.getClienti(e)
            })
        }
    }

    getClienti = async (idCliente) => {
        const newArray = [];
        const utente = (await Firestore.collection('UTENTI').doc(idCliente).get()).data();

        this.state.clienti.push({ title: idCliente, username: utente.username });
        this.setState({ clienti: this.state.clienti });

        this.state.clienti.map((e) => {
            this.state.arrayClienti.push({ label: e.username, value: e.title })
        })

        
        this.state.arrayClienti.forEach(obj => {
            if (!newArray.some(o => o.label === obj.label)) {
                newArray.push({ ...obj })
            }
        });

        this.setState({ arrayClienti: newArray })
        console.log(this.state.arrayClienti)
    }

    aggiungiScheda = async () => {
        console.log(this.state.userSelected)

        console.log(this.state.schedaArray[0].esercizi + 'day'+this.state.schedaArray[0].day)

    }

    render() {
        const { schedaArray } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Schede allenamento" />

                <Text style={styles.titleParagraph}>Scegli l'alteta:</Text>
                <DropDownPicker
                        items={this.state.arrayClienti}
                        defaultValue={this.state.userSelected}
                        placeholder="Scegli..."
                        containerStyle={{ height: 60, width: 150 }}
                        style={{ backgroundColor: '#fafafa', marginTop: 10, marginLeft:15 }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa',marginLeft:15 }}
                        onChangeItem={item => this.selectUser(item)}
                />

                <FlatList style={{ margin: 10}}
                    data={schedaArray}
                    scrollEnabled={true}
                    numColumns={width>1000 ? 2 : 1 }
                    keyExtractor={(item) => item.day}
                    refreshing={this._onRefresh}
                    renderItem={({ item, index }) => (
                        <Scheda scheda={schedaArray[index]} aggiungiValori={this.aggiungiValori} daySelected={this.daySelected} />
                    )}
                />
                <BottoneAddWorkOut addDay={this.addDay} addEsercizio={this.addEsercizio} exitDay={selectDay} atletaSelezionato={this.state.userSelected}/>
                <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.aggiungiScheda() }}>
                    <Text style={styles.appButtonText}>Salva</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

}
export default CreateWorkout;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    titleParagraph: {
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        marginTop:25,
        marginLeft:15
    },
    appButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
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
    }
})

