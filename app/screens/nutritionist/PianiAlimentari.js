import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Button, Dimensions, Platform } from 'react-native';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent"
import { Firestore } from "../../config/FirebaseConfig";
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment';




const { width, height } = Dimensions.get('screen');


class PianiAlimentari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formInput: [],
            arrayPasti: [],
            date: Platform.OS === 'web' ? '' : new Date(),
            mode: 'date',
            show: true,
        }
        console.log("piani alimentari", this.props)
    }
    //serve
    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    //serve
    addValori = async () => {
        const today = moment().format("MMM Do YY");

        if (today === moment(this.state.date, true).format("MMM Do YY")) {
            alert("si prega di selezionare una data diversa da quella odierna");
        } else if (0 === this.state.arrayPasti.length) {
            alert("scrivere prima i pasti")

        } else if (this.state.arrayPasti.map((e, i) => {
            if ("" === e.tipo || null === e.valore)
                return true;
            else
                return false;
        })) {
            alert("si prega di controllare tutti i campi")
        } else {
            let user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
            const key = this.makeid(25);
            var arraySupport = [];
            arraySupport = user.diete;
            arraySupport.push(key);

            Firestore.collection(
                'UTENTI'
            ).doc(
                '3hVSFBjPhuUUD9RWuNckZKVxpuz1'
            ).update({
                'diete': arraySupport,
            }).then(() => {
                console.log('User updated!');
            });

            Firestore.collection(
                'DIETE'
            ).doc(
                key
            ).set({
                valori: this.state.arrayPasti,
                datainizio: new Date(),
                datafine: this.state.date
            });


            this.state.arrayPasti = [];
            this.state.formInput = [];

            this.setState({ arrayPasti: [] });
            this.setState({ formInput: [] });

        }

    }


    //serve
    changeText = (text, id) => {
        this.state.arrayPasti.push({ tipo: nome, valore: val })
        var support = this.state.arrayPasti;
        this.setState({ arrayMisurazioni: support });
    }

    //serve
    addTextInput = (key) => {
        let formInput = this.state.formInput;
        let arrayPasti = this.state.arrayPasti;
        console.log("3", this.state.arrayPasti)
        console.log("4", this.state.arrayPasti)

        arrayPasti.push({ tipo: "", valore: null })
        formInput.push(
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <DropDownPicker
                    items={[
                        { label: 'Colazione', value: 'colazione' },
                        { label: 'Pranzo', value: 'pranzo' },
                        { label: 'Cena', value: 'cena' },
                        { label: 'Spuntino', value: 'spuntino' },
                    ]}
                    defaultValue={this.state.arrayPasti[key].tipo}
                    containerStyle={{ height: 40 }}
                    style={styles.selectStyle}
                    itemStyle={styles.selectStyle}
                    dropDownStyle={styles.selectdropDownStyle}
                    onChangeItem={item => {
                        arrayPasti[key].tipo = item.value
                        this.setState({ arrayPasti: arrayPasti })

                    }}
                />
                <TextInput
                    label="Inserisci la misurazione"

                    value={arrayPasti[key].valore}
                    placeholder="inserisci gli alimenti"
                    onChangeText={text => {
                        arrayPasti[key].valore = text
                        this.setState({ arrayPasti: arrayPasti })
                        console.log(this.state.arrayPasti)
                    }}
                />
                <Icon
                    size='24'
                    name='trash'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => {
                        this.state.arrayPasti = [];
                        this.state.formInput = [];

                        this.setState({ arrayPasti: [] });
                        this.setState({ formInput: [] });
                    }}
                />
            </SafeAreaView>
        );
        this.setState({ formInput })
    }
    //non serve
    addPasto = (text) => {
        return (
            <TextInput
                style={styles.input}
                onChangeText={this.addPasto}
                value={text}
            />
        )
    }
    renderItem = () => (
        <View style={{ flexDirection: 'row' }}  >
            <Text style={styles.textInput}> L'atleta scelto è {this.props.route.params.username}</Text>
            <Icon
                raised
                size={15}
                name='times'
                type='font-awesome'
                color='#f50'
                onPress={() => {
                    this.props.route.params.username = ''
                    this.setState({ username: 'null' })
                    alert("Si prega di selezionare un utente")
                    this.props.navigation.navigate("ListaUtenti", { routeProps: this.prop })
                }} />
        </View>
    );

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.state.show = false;
        this.setState({ show: false })
        this.setState({ date: currentDate })

        const today = moment().format("MMM Do YY");

        if (today === moment(currentDate, true).format("MMM Do YY")) {
            alert("si prega di selezionare una data diversa da quella odierna");
        }
    };

    showMode = (currentMode) => {
        this.setState({ show: true })
        this.setState({ mode: currentMode })
    };



    render() {

        return (
            <SafeAreaView style={styles.datiPersonali}>
                <HeaderComponent {...this.props} title="Dati Personali" />


                {this.props.route.params === undefined ? (<>
                    { alert("si prega di selezionare un utente")}
                    { this.props.navigation.navigate("ListaUtenti", { routeProps: this.prop })}
                </>) : (<>
                    <View style={styles.container}>
                        <Text style={styles.textHeader}>Crea il piano alimentare</Text>

                        <Card.Divider />
                        {this.renderItem()}
                        <Card.Divider />
                        {Platform.OS === 'web' && <>
                            <View style={{ flexDirection: 'row' }}  >

                                <Text>Si prega di inserire una data per lo scadere della dieta</Text>
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


                                        console.log(this.state.date)

                                    }}
                                    style={styles.textInputStype}
                                />
                            </View>
                        </>}

                        {Platform.OS !== 'web' && <>

                            <Text>Si prega di inserire una data per lo scadere della dieta</Text>

                            {/* <Button onPress={() => this.showDatepicker()} title="Show date picker!" /> */}
                            {/* <Button onPress={() => this.showTimepicker()} title="Show time picker!" /> */}

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
                        <View style={{ marginTop: 15 }}>
                            <Card style={{ flex: 1 }}>
                                <Card.Title>Set Palestra</Card.Title>
                                <Card.Divider />
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        {this.state.formInput.map((value, index) => {
                                            return value
                                        })}
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>



                    <TouchableOpacity style={styles.button} onPress={() => this.addTextInput(this.state.formInput.length)}>
                        <Text style={styles.appButtonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.addValori() }}>
                        <Text style={styles.appButtonText}>Salva</Text>
                    </TouchableOpacity></>)
                }

                {/* <ModalAddPranzi aggiungiValori={this.aggiungiValori}></ModalAddPranzi> */}
            </SafeAreaView>
        )
    }
}

export default PianiAlimentari;

const styles = StyleSheet.create({
    textInputStype: {
        // height: '6%',
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1
    },
    datiPersonali: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 2,
        paddingHorizontal: 20,
        marginTop: 30
    },
    textHeader: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
    },
    //fa riferimento a quello che è il modal
    // modal: { backgroundColor: 'transparent', padding: 20, },
    selectStyle: { backgroundColor: '#ff6c16', },
    selectdropDownStyle: { backgroundColor: '#ff6c16', },
    itemSelectStyle: { backgroundColor: '#ff6c16', },
    button: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        width: 45,
        height: 45,
        borderRadius: 50,
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

    // action: {
    //     flexDirection: 'row',
    //     marginTop: 55,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#f2f2f2',
    //     paddingBottom: 7
    // },
    // textLogin: {
    //     color: '#05375a',
    //     fontSize: 18,
    //     fontWeight: "bold"
    // },

    //si riferisce al textinput che si aggiunge col pulsante
    textInput: {
        flex: 1,
        marginTop: 4,
        fontSize: 18,
        paddingLeft: 15,
        color: '#05375a',
        alignItems: 'flex-start',

    },
    // button: {
    //     alignItems: 'center',
    //     marginTop: 50
    // },
    // signIn: {
    //     width: '100%',
    //     height: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 10
    // },
    // textSign: {
    //     fontSize: 18,
    //     color: '#fff',
    //     fontWeight: 'bold'
    // },
    // appButtonContainer: {
    //     position: 'absolute',
    //     zIndex: 11,
    //     right: 20,
    //     bottom: 90,
    //     width: 45,
    //     height: 45,
    //     borderRadius: 50,
    //     backgroundColor: 'black',
    //     borderColor: 'black',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 8,
    // },


    // appButtonText: {
    //     fontSize: 20,
    //     color: "#fff",
    //     fontWeight: "bold",
    //     alignSelf: "center",
    //     textTransform: "uppercase"
    // },


});
{/* <TouchableOpacity style={style.button} onPress={showModal}> */ }
{/* <Text style={style.appButtonText}>+</Text> */ }
{/* </TouchableOpacity> */ }
{/* <Button style={styles.appButtonSave} title='+++' onPress={() => this.addTextInput(this.state.textInput.length)} /> */ }

//forse non serve
// getValori = async () => {
//     const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
//     console.log("user-> ", user);
//     const misure1 = (await Firestore.collection('MISURE').doc(user.misurazioni).get()).data();
//     console.log("misure->", misure);
//     this.setState({ misure: Object.keys(misure1.misurazioni).map((key) => misure1.misurazioni[key]) });

//     for (let i = 0; i < this.state.misure.length; i++) {
//         var support = this.state.misure[i];
//         Firestore.collection('MISURAZIONI').doc(support[0]).get()
//             .then((misure) => {
//                 console.log("miurazioni->", misurazioni);
//                 this.state.arrayPasti.push(misure.data())
//                 var support = this.state.arrayPasti;
//                 this.setState({ arrayMisurazioni: support })
//             });
//     }
// }