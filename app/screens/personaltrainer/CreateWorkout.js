import React, { Component, useState } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, Text, FlatList,Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text'
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
            userSelected:'',
            oidUser:'',
            date: Platform.OS === 'web' ? '' : new Date(),
            mode: 'date',
        };
        this.getUser();
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

    addDay = () => {
        let lunghezza = this.state.schedaArray.length;
        this.state.schedaArray.push({ day: lunghezza, esercizi: [] });
        var support = this.state.schedaArray;
        selectDay = lunghezza;
        this.setState({ schedaArray: support });
    };

    addEsercizio = () => {
        this.state.schedaArray[selectDay].esercizi.push({ esercizio: '', ripetizioni: '', colpi: '', recupero: '', day: '' })
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
                this.state.schedaArray[daySelect].esercizi[num].day = daySelect
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
        var oidUser = Object.values(item)[0];
        this.state.userSelected = user
        this.state.oidUser = oidUser
        this.setState({userSelected:this.state.userSelected})
        this.setState({oidUser:this.state.oidUser})
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
        var arrayScheda = [];
        var arraySupport = [];
                
        for(var i = 0; i<this.state.schedaArray.length; i++) {
            const key = this.makeid(25);
            arraySupport.push(key);
            Firestore.collection(
                'ESERCIZI'
            ).doc(
                key
            ).set({
                esercizi: this.state.schedaArray[i].esercizi,
            }).then(console.log("Esercizi Aggiunti"));
            
        }
 
        const keyScheda = this.makeid(25);
        arrayScheda.push(keyScheda)
        
        Firestore.collection(
            'SCHEDE'
        ).doc(
            keyScheda
        ).set({
            days: arraySupport,
            dataScadenza: this.state.date
        }).then(console.log("Scheda Aggiunta"));
        
        Firestore.collection(
            'UTENTI'
        ).doc(
            this.state.userSelected
        ).update({
            'schede': arrayScheda,
        }).then(() => {
            console.log('User updated!');
        });
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

                {this.state.userSelected != '' ? (
                    <>

                            {Platform.OS === 'web' && <>
                            <View style={{ flexDirection: 'row', marginTop:15 }}  >

                                <Text style={styles.titleSubParagraph}>Data di scadenza scheda</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    value={this.state.date}
                                    onChangeText={(text) => {

                                        var data = new Intl.DateTimeFormat('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

                                        this.state.date = text
                                        this.setState({ date: text })
                                        if (text === data) {
                                            alert("si prega di selezionare una data diversa da quella odierna");
                                            this.setState({ date: '' })
                                        }

                                    }}
                                    style={{marginHorizontal:10, borderColor:'black', borderWidth:2}}
                                />
                            </View>
                        </>}

                        {Platform.OS !== 'web' && <>

                            <Text style={styles.titleSubParagraph}>Data di scadenza scheda</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode={this.state.mode}
                                dateFormat="longdate"
                                RNDateTimePicker locale="it-IT"
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                            />
                        </>}
                    </>
                ):(
                    <>
                    </>
                )}

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
    },
    titleSubParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginLeft:15
     }
})

