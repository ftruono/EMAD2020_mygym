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
            checkDati: false,
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
    checkDati = () => {
        this.state.arrayPasti.map((e, i) => {
            console.log(e)
            if ("" === e.tipo || null === e.valore) {
                this.state.checkDati = true;
                this.setState({ checkDati: true })
            } else {
                this.state.checkDati = false;
                this.setState({ checkDati: false })
            }
        })
    }
    //serve
    addValori = async () => {

        this.checkDati()
        if (new Date().getTime() >= new Date(this.state.date).getTime()) {
            alert("si prega di selezionare una data successiva a quella odierna");
        } else if (0 === this.state.arrayPasti.length) {
            alert("scrivere prima i pasti")
        } else if (this.state.checkDati) {
            alert("si prega di controllare tutti i campi")
        } else if (this.props.route.params.uid === undefined) {
            alert("seleziona prima un cliente")
        } else {

            let user = (await Firestore.collection('UTENTI').doc(this.props.route.params.uid).get()).data();
            const key = this.makeid(25);
            var arraySupport = [];
            arraySupport = user.diete;
            arraySupport.push(key);


            Firestore.collection(
                'UTENTI'
            ).doc(
                this.props.route.params.uid
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
                datafine: Platform.OS === 'web' ? new Date(this.state.date) : this.state.date
            }).then(console.log("aggiunti"));

            alert("Dieta aggiunta");

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
            <SafeAreaView>
                {Platform.OS !== 'web' && <>
                    <View style={{ flexDirection: 'row' }}>
                        <DropDownPicker
                            items={[
                                { label: 'Colazione', value: 'colazione' },
                                { label: 'Pranzo', value: 'pranzo' },
                                { label: 'Cena', value: 'cena' },
                                { label: 'Spuntino', value: 'spuntino' },
                            ]}
                            defaultValue={this.state.arrayPasti[key].tipo}
                            containerStyle={{ height: 40, width: 150 }}
                            style={styles.selectStyle}
                            itemStyle={styles.selectStyle}
                            dropDownStyle={styles.selectdropDownStyle}
                            onChangeItem={item => {
                                arrayPasti[key].tipo = item.value
                                this.setState({ arrayPasti: arrayPasti })

                            }}
                        />

                        <TextInput
                            label="Inserisci gli alimenti"

                            value={arrayPasti[key].valore}
                            style={{ width: 120 }}
                            placeholder="Inserisci gli alimenti"
                            onChangeText={text => {
                                arrayPasti[key].valore = text
                                this.setState({ arrayPasti: arrayPasti })
                                console.log(this.state.arrayPasti)
                            }}
                        />

                        <Icon
                            size={25}
                            style={{ marginLeft: 15, marginTop: 8 }}
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

                    </View>
                </>}

                {Platform.OS === 'web' && <>
                    <View style={{ flexDirection: 'row' }}>
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
                            label="Inserisci gli alimenti"

                            value={arrayPasti[key].valore}
                            style={styles.textInput}
                            placeholder="Inserisci gli alimenti"
                            onChangeText={text => {
                                arrayPasti[key].valore = text
                                this.setState({ arrayPasti: arrayPasti })
                                console.log(this.state.arrayPasti)
                            }}
                        />
                        <Icon
                            size={25}
                            style={{ marginLeft: 15, marginTop: 8 }}
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
                    </View>
                </>
                }
            </SafeAreaView>
        );
        this.setState({ formInput })
    }
    //serve
    renderItem = () => (
        <View>
            <View style={{ flexDirection: 'row' }}  >
                {this.showPage()}
                <Text style={styles.textInput}> Il cliente selezionato è {this.props.route.params.username}</Text>
                <Icon
                    raised
                    size={10}
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

            <Card.Divider />

            <View style={{ flexDirection: 'row' }}  >
                <Text onPress={() => { this.props.navigation.navigate("Statistiche", { uid: this.props.route.params.username, routeProps: this.props }) }} style={styles.textInput}>  Vuoi vedere sue su statistiche, clicca qui</Text>
            </View>
        </View>
    );
    //serve
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
    //serve
    showMode = (currentMode) => {
        this.setState({ show: true })
        this.setState({ mode: currentMode })
    };
    //serve
    showPage = () => {
        if (this.props.route.params === undefined) {
            alert("si prega di selezionare un utente");
            console.log(this.props.route.params);
            this.props.navigation.navigate("ListaUtenti", { routeProps: this.prop });
        }
    }

    render() {

        return (
            <SafeAreaView style={styles.datiPersonali}>
                <HeaderComponent {...this.props} title="Piani alimentari" />


                {this.props.route.params === undefined || this.props.route.params.username === undefined ? (<>
                    {this.showPage()}
                </>) : (<>
                    <View style={styles.container}>
                        <Text style={styles.titleParagraph}>Crea il piano alimentare</Text>

                        <Card.Divider />

                        {this.renderItem()}
                        <Card.Divider />
                        {Platform.OS === 'web' && <>
                            <View style={{ flexDirection: 'row' }}  >

                                <Text>Si prega di inserire una data per lo scadere della dieta con il seguente formato DD/MM/YYYY</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    value={this.state.date}
                                    onChangeText={(text) => {
                                        this.state.date = text;
                                        this.setState({ date: text });
                                    }}
                                    style={{ marginHorizontal: 10, borderColor: 'black', borderWidth: 2 }}
                                />
                            </View>
                        </>}

                        {Platform.OS !== 'web' && <>

                            <Text>Si prega di inserire una data per lo scadere della dieta</Text>

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
                                <Card.Title>Piano Alimentare</Card.Title>
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
    }, titleParagraph: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 15,
        marginLeft: 15
    },
    //si riferisce al textinput che si aggiunge col pulsante
    textInput: {
        flex: 1,
        marginTop: 4,
        fontSize: 18,
        paddingLeft: 15,
        color: '#05375a',
        alignItems: 'flex-start',

    },

});