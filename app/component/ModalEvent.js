import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const ModalEvent = (props) => {

    const [descrizione, setDescrizione] = React.useState('');
    const [errore_descrizione, setErroreDescrizione] = React.useState('');
    const [durata, setDurata] = React.useState('');
    const [errore_durata, setErroreDurata] = React.useState('');
    const [titolo, setTitolo] = React.useState('');
    const [errore_titolo, setErroreTitolo] = React.useState('');

    var evento = props.day_event;
    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.isModalVisible} transparent={false} onDismiss={props.handleClose} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <View style={styles.selectStyle}>
                            <View style={{ margin: 5 }}>
                                <Text style={styles.textTitle}>Inserisci un nuovo evento</Text>
                                <Text style={styles.textTitle}>Data: {evento.day}</Text>


                                <Text style={styles.text}>Titolo evento:</Text>
                                <TextInput
                                    label="Inserisci titolo evento"
                                    value={titolo}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setTitolo(text)}
                                />
                                <Text style={{color: 'red'}}>{errore_titolo}</Text>


                                <Text style={styles.text}>Durata</Text>
                                <TextInput
                                    label="Inserisci durata evento"
                                    value={durata}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setDurata(text)}
                                />
                                <Text style={{color: 'red'}}>{errore_durata}</Text>


                                <Text style={[styles.text]}>Descrizione</Text>
                                <TextInput
                                    label="Inserisci descrizione/link evento"
                                    value={descrizione}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setDescrizione(text)}
                                />
                                <Text style={{color: 'red'}}>{errore_descrizione}</Text>


                                <View style={styles.action}>
                                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 150, }]} onPress={props.handleClose}>
                                        <Text style={styles.appButtonText}>Chiudi</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 150, marginLeft: 16 }]}
                                        onPress={() => {
                                            if (descrizione == '') {
                                                setErroreDescrizione("inserisci una descrizione")
                                            }  
                                            if (titolo == '') {
                                                setErroreTitolo("inserisci un titolo")
                                            }  
                                            if (durata == '') {
                                                setE('inserisci una durata')
                                            } 
                                            if(descrizione != ''&& titolo != ''&& durata != '' ){
                                                evento = [{
                                                    day: props.day_event.day,
                                                    descrizione: descrizione,
                                                    durata: durata,
                                                    id_creatore: 'NELLO',
                                                    titolo: titolo
                                                }]
                                                props.getAdd(evento)
                                                props.handleClose
                                            }
                                        }
                                        }
                                    >
                                        <Text style={styles.appButtonText}>Salva</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </ScrollView>

                </Modal >
            </Portal>

        </Provider>
    );
};

const styles = StyleSheet.create({

    modal: { backgroundColor: 'transparent', padding: 20, },
    selectStyle: { backgroundColor: '#fafafa', margin: width > 500 ? 20 : 5 },
    selectdropDownStyle: { backgroundColor: '#fafafa', },
    appButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    action: {
        flexDirection: 'row',
        // marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    textTitle: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30
    },
    text: {
        color: '#05375a',
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 35
    },
    action: {
        flexDirection: 'row',
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});
export default ModalEvent;
// alignItems: 'center',
// justifyContent: 'center',

