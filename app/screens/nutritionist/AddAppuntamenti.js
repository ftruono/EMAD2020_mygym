import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Button, Provider, View } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, Platform, TextInput, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Firestore } from "../../config/FirebaseConfig";
import moment from 'moment';



const AddAppuntamenti = (props) => {
    let ArrayClienti = props.ArrayClienti, itemsDropDown = [];

    const [visible, setVisible] = React.useState(props.visible);
    const [textData, onChangeTextData] = React.useState(null);
    const [hour, setHour] = React.useState(null);

    const [date, setDate] = React.useState(new Date());
    const [user, setUser] = React.useState('');
    const [uid, setUid] = React.useState('')
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    // const showModal = () => React.setVisible(true);
    const hideModal = () => { setVisible(false), props.hidenAddAppuntamenti() };
    const selectUser = (name) => { console.log(Object.values(name)[1]); setUser(Object.values(name)[1]); setUid(Object.values(name)[1]); }

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setMode('time');
    };




    const addAppuntamentoWeb = async () => {
        // moment(textData).format("MMM Do YY");
        const supportDate = textData + "," + hour;
        const today = moment(supportDate).format('MMMM Do YYYY,HH:mm');

        if (today === 'Invalid date') {
            alert("data non valida si preda di rispettare il formato delineato")
        } else if (moment().format("MMM Do YY") > moment(today, true).format("MMM Do YY")) {
            alert("seleziona una data valida");
        } else if (user === '' || uid === '') {
            alert("seleziona un utente valido");
        } else {
            let nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();
            let support = [];

            nt.appuntamenti.push({ giorno: new Date(moment(supportDate).format('YYYY-MM-DD hh:mm:ss a')), cliente: uid, id: makeid(10) });
            support = nt.appuntamenti;


            // let support = []; support.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' })
            // user.appuntamenti.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' });

            Firestore.collection(
                'UTENTI'
            ).doc(
                'PdlCUX3dqLNDqp4gcRD0awdAJ0t2'
            ).update({
                'appuntamenti': support,
            }).then(() => {
                console.log('User updated!');
            });


        }

    }

    const addAppuntamento = async () => {
        // const today = moment().format("MMM Do YY");

        if (moment().format("MMM Do YY") > moment(date, true).format("MMM Do YY")) {
            alert("seleziona una data valida");
        } else if (user === '' || uid === '') {
            alert("seleziona un utente valido");
        } else {
            let nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();
            let support = [];


            nt.appuntamenti.push({ giorno: date, cliente: uid, id: makeid(10) });
            support = nt.appuntamenti;


            // let support = []; support.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' })
// user.appuntamenti.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' });

            Firestore.collection(
                'UTENTI'
            ).doc(
                'PdlCUX3dqLNDqp4gcRD0awdAJ0t2'
            ).update({
                'appuntamenti': support,
            }).then(() => {
                console.log('User updated!');
            });


        }
    };

    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
                    <Text>Selezione una cliente</Text>

                    <DropDownPicker
                        items={ArrayClienti}
                        defaultValue={user}
                        containerStyle={{ height: 40 }}
                        style={style.selectStyle}
                        itemStyle={style.selectStyle}
                        dropDownStyle={style.selectdropDownStyle}
                        onChangeItem={item => selectUser(item)}
                    />
                    <Text>Seleziona giorno e ora</Text>
                    {Platform.OS !== 'web' && <>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                        <Icon
                            raised
                            name='check'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => {
                                addAppuntamento()
                                hideModal();

                            }}
                        />
                    </>}

                    {Platform.OS === 'web' && <>
                        <Text>Inserisci la data con il seguente formato DD/MM/YYY</Text>
                        <TextInput
                            style={style.input}
                            onChangeText={onChangeTextData}
                            value={textData}
                            placeholder="DD/MM/YYY"
                            keyboardType="text"
                        />
                        <Text>Inserisci l'ora con il seguente formato HH:MM</Text>
                        <TextInput
                            style={style.input}
                            onChangeText={setHour}
                            value={hour}
                            placeholder="HH:MM"
                            keyboardType="text"
                        />


                        <Icon
                            raised
                            name='check'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => {
                                addAppuntamentoWeb()
                                hideModal();

                            }} />
                    </>}


                    <Icon
                        raised
                        name='times-circle'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => {

                            hideModal();

                        }} />

                </Modal>
            </Portal>
        </Provider>
    );
};


const style = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    modal: { backgroundColor: 'white', padding: 20, },
    selectStyle: { backgroundColor: '#fafafa', },
    selectdropDownStyle: { backgroundColor: '#fafafa', },
    itemSelectStyle: { justifyContent: 'flex-start', },
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
    selectStyle: { backgroundColor: '#ff6c16', },
    selectdropDownStyle: { backgroundColor: '#ff6c16', },
    itemSelectStyle: { backgroundColor: '#ff6c16', },
})
export default AddAppuntamenti;
