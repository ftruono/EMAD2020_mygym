import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Button, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent"
import ModalAddPranzi from './ModalAddPranzi';
import { Firestore } from "../../config/FirebaseConfig";
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


// import nextId from 'react-id-generator';


const { width, height } = Dimensions.get('screen');

export default class DatiPersonaliUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            formInput: [],
            arrayPasti: []
        }
        console.log("larghezza->", width)
        console.log("larghezza->", width / 5)
        console.log("larghezza2->", ((width / 5) * 3))
        console.log("larghezza3->", ((width / 5) * 3) + ((width / 5) - 30))
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

        let user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
        const key = this.makeid(25);
        user.misure.push(key);

        Firestore.collection(
            'UTENTI'
        ).doc(
            '3hVSFBjPhuUUD9RWuNckZKVxpuz1'
        ).update({
            'diete': user.misure,
        }).then(() => {
            console.log('User updated!');
        });

        Firestore.collection(
            'DIETE'
        ).doc(
            key
        ).set({
            valori: this.state.arrayPasti,
            data: new Date()
        });


        this.state.arrayPasti.push({})
        var support = this.state.arrayPasti;
        this.setState({ arrayMisurazioni: support });
    }
    //forse non serve
    getValori = async () => {
        const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
        console.log("user-> ", user);
        const misure1 = (await Firestore.collection('MISURE').doc(user.misurazioni).get()).data();
        console.log("misure->", misure);
        this.setState({ misure: Object.keys(misure1.misurazioni).map((key) => misure1.misurazioni[key]) });

        for (let i = 0; i < this.state.misure.length; i++) {
            var support = this.state.misure[i];
            Firestore.collection('MISURAZIONI').doc(support[0]).get()
                .then((misure) => {
                    console.log("miurazioni->", misurazioni);
                    this.state.arrayPasti.push(misure.data())
                    var support = this.state.arrayPasti;
                    this.setState({ arrayMisurazioni: support })
                });
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
        var support = '';
        let formInput = this.state.formInput;
        let arrayPasti = this.state.arrayPasti;
        arrayPasti.push({ tipo: "", valore: 'strunz' })
        formInput.push(
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
                    label="Inserisci la misurazione"
                    style={styles.textInput}
                    value={this.state.arrayPasti[key].valore}
                    placeholder="inserisci gli alimenti"
                    onChangeText={text => {
                        support+= text
                        arrayPasti[key].valore+= text
                        console.log(arrayPasti[key].valore)
                        this.setState({ arrayPasti: arrayPasti })
                        console.log(this.state.arrayPasti)
                    }}
                />

                <Icon
                    size="24"
                    name='trash'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => {
                        // this.state.arrayPasti.splice(i, 1);
                        // var support = this.state.arrayPasti;
                        // this.setState({ arrayMisurazioni: support })
                    }} />
            </View>
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

    render() {
        return (
            <SafeAreaView style={styles.datiPersonali}>
                <HeaderComponent {...this.props} title="Dati Personali" />
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.textHeader}>Dati personali</Text>

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
                </ScrollView>


                <TouchableOpacity style={styles.button} onPress={() => this.addTextInput(this.state.formInput.length)}>
                    <Text style={styles.appButtonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.addValori() }}>
                    <Text style={styles.appButtonText}>Salva</Text>
                </TouchableOpacity>
                <ModalAddPranzi aggiungiValori={this.aggiungiValori}></ModalAddPranzi>
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
    textHeader: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
    },
    //fa riferimento a quello che è il modal
    // modal: { backgroundColor: 'transparent', padding: 20, },
    selectStyle: { backgroundColor: '#ff6c16', width: width / 5 },
    selectdropDownStyle: { backgroundColor: '#ff6c16', width: width / 5 },
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
        paddingLeft: 15,
        color: '#05375a',
        alignItems: 'flex-start',
        width: ((width / 5) * 3)
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