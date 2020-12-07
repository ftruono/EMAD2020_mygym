import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Modal, Portal, Button, Provider, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';


const { width, height } = Dimensions.get('screen');

const ModalEvent = (props) => {

    const [descrizione, setDescrizione] = React.useState('');
    const [errore_descrizione, setErroreDescrizione] = React.useState('');
    const [durata, setDurata] = React.useState('');
    const [errore_durata, setErroreDurata] = React.useState('');
    const [titolo, setTitolo] = React.useState('');
    const [errore_titolo, setErroreTitolo] = React.useState('');
    const [ora, setOra] = React.useState(false);
    const [errore_ora, setErroreOra] = React.useState('');
    var eventi = props.day_event;
    console.log(props.data)



    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.isModalVisible} transparent={false} onDismiss={props.handleClose} contentContainerStyle={styles.modal}>
                    <ScrollView>

                        <View style={styles.selectStyle}>
                            <View style={{ margin: 5 }}>
                                <Text style={styles.textTitle}>Inserisci un nuovo evento</Text>
                                <Text style={styles.textTitle}>Data: {eventi.day}</Text>

                                <Text style={styles.text}>Ora</Text>
                                <TextInput
                                    label="Inserisci titolo evento"
                                    value={eventi.ora == '' ? titolo : eventi.ora}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setOra(text)}
                                />

                                <Text style={{ color: 'red' }}>{errore_ora}</Text>

                                <Text style={styles.text}>Titolo evento:</Text>
                                <TextInput
                                    label="Inserisci titolo evento"
                                    value={eventi.titolo == '' ? titolo : eventi.titolo}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setTitolo(text)}
                                />
                                <Text style={{ color: 'red' }}>{errore_titolo}</Text>

                                <Text style={styles.text}>Durata</Text>
                                <TextInput
                                    label="Inserisci durata evento"
                                    value={eventi.durata == '' ? durata : eventi.durata}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setDurata(text)}
                                />
                                <Text style={{ color: 'red' }}>{errore_durata}</Text>


                                <Text style={[styles.text]}>Descrizione</Text>
                                <TextInput
                                    label="Inserisci descrizione/link evento"
                                    value={eventi.descrizione == '' ? descrizione : eventi.descrizione}
                                    editable={global.userType == 'UT' ? true : false}
                                    onChangeText={text => setDescrizione(text)}
                                />
                                <Text style={{ color: 'red' }}>{errore_descrizione}</Text>


                                <View style={styles.action}>
                                    <Icon raised
                                        name='times-circle'
                                        type='font-awesome'
                                        color='#f50'
                                        onPress={() => {
                                            props.handleClose()

                                        }} />
                                        
                                    {eventi.titolo != '' ? (<>
                                        <Icon
                                            raised
                                            name='arrow-left'
                                            type='font-awesome'
                                            color='#f50'
                                            onPress={() => {
                                                props.selectEvento(-1)
                                            }} />
                                        <Icon
                                            raised
                                            name='arrow-right'
                                            type='font-awesome'
                                            color='#f50'
                                            onPress={() => {
                                                props.selectEvento(+1)
                                            }} />
                                    </>) : (<></>)}
                                    {global.userType == 'PT' ? (<>
                                        <Icon
                                            visible={false}
                                            hide={true}
                                            raised
                                            name={eventi.titolo == '' ? 'plus' : 'trash'}
                                            type='font-awesome'
                                            color='#f50'
                                            onPress={() => {
                                                eventi.titolo == '' ? props.addDay(eventi.day) : alert("lo cancelleremo mi serve del tempo ")

                                            }} />
                                    </>) : (<></>)}
                                    <Icon
                                        visible={false}
                                        hide={true}
                                        raised
                                        name='check'
                                        type='font-awesome'
                                        color='#f50'
                                        onPress={() => {

                                            if (descrizione == '') {
                                                setErroreDescrizione("inserisci una descrizione")
                                            }
                                            if (titolo == '') {
                                                setErroreTitolo("inserisci un titolo")
                                            }
                                            if (durata == '') {
                                                setErroreDurata('inserisci una durata')
                                            }
                                            if (descrizione != '' && titolo != '' && durata != '') {
                                                var evento = {
                                                    day: props.day_event.day,
                                                    descrizione: descrizione,
                                                    durata: durata,
                                                    id_creatore: 'NELLO',
                                                    titolo: titolo
                                                }
                                                props.getAdd(evento)
                                                props.handleClose()
                                            }


                                        }} />
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

