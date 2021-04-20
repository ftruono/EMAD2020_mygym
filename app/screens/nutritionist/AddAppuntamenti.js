import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Button, Provider, View } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, Platform, TextInput, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import moment from 'moment';
//import DateTimePickerModal from "react-native-modal-datetime-picker";



const AddAppuntamenti = (props) => {
    let ArrayClienti = props.ArrayClienti, itemsDropDown = [];

    const [visible, setVisible] = React.useState(props.visible);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    //per pc
    const [textData, onChangeTextData] = React.useState(null);
    const [hour, setHour] = React.useState(null);
    //per mobile
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');

    const [user, setUser] = React.useState('');
    const [uid, setUid] = React.useState(null)
    const [supportModify, setSupportModify] = React.useState(true)
    const uidFirebase = FirebaseAutentication.currentUser.uid;

    // const showModal = () => React.setVisible(true);
    const hideModal = (data, cliente) => {
        setVisible(false),
        props.hidenAddAppuntamenti(data, cliente)
        // setDate(new Date()),
        // setHour(null),
        // onChangeTextData(null),
        // setSupportModify(true),
        // setUser(''),
        // setUid('')
    };

    const selectUser = (name) => { console.log(Object.values(name)); setUser(Object.values(name)[1]); setUid(Object.values(name)); }

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };


    const addAppuntamentoWeb = async () => {
        // moment(textData).format("MMM Do YY");
        // const uid=FirebaseAutentication.currentUser.uid


        const supportDate = textData + " " + hour;
        const today = new Date(moment(supportDate).format('YYYY-MM-DD HH:mm:ss'));

        // console.log(today)

        if (today === 'Invalid date') {
            alert("data non valida si preda di rispettare il formato delineato")
        } else if (moment().format("YYYY MM DD") > moment(today, true).format("YYYY MM DD")) {
            alert("seleziona una data valida");
        } else if ( uid === null) {
            alert("seleziona un utente valido");
        } else {
            let nt = (await Firestore.collection('UTENTI').doc(uidFirebase).get()).data();
            let support = [];


            nt.appuntamenti.push({ giorno: new Date(moment(supportDate).format('YYYY-MM-DD HH:mm:ss')), cliente: Object.values(uid)[1], id: makeid(10), nome: Object.values(uid)[0] });
            support = nt.appuntamenti;

            Firestore.collection(
                'UTENTI'
            ).doc(
                uidFirebase
            ).update({
                'appuntamenti': support,
            }).then(() => {
                console.log('User updated!');
            });

            hideModal();
        }

    }

    const addAppuntamento = async () => {
        // const today = moment().format("MMM Do YY");

        if (moment().format("MMM Do YY") > moment(date, true).format("MMM Do YY")) {
            alert("seleziona una data valida");
        } else if (uid === null) {
            alert("seleziona un utente valido");
        } else {
            let nt = (await Firestore.collection('UTENTI').doc(uidFirebase).get()).data();
            let support = [];


            nt.appuntamenti.push({ giorno: date, cliente: Object.values(uid)[1], id: makeid(10), nome: Object.values(uid)[0] });
            support = nt.appuntamenti;


            // let support = []; support.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' })
            // user.appuntamenti.push({ giorno: new Date(), cliente: '3hVSFBjPhuUUD9RWuNckZKVxpuz1' });

            Firestore.collection(
                'UTENTI'
            ).doc(
                uidFirebase
            ).update({
                'appuntamenti': support,
            }).then(() => {
                console.log('User updated!');
            });


        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        console.log("A date has been picked: ", date);

        hideDatePicker();


    };
    return (

        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
                    <Text>Selezione una cliente</Text>
                    {!props.modify ? (<>
                        <DropDownPicker
                            items={ArrayClienti}
                            defaultValue={user}
                            //!props.modify ? user : Object.values(props.ArrayClienti[0])[1] === 'undefined'? "errore" : Object.values(props.ArrayClienti[0])[1]}
                            containerStyle={{ height: 40 }}
                            style={style.selectStyle}
                            itemStyle={style.selectStyle}
                            dropDownStyle={style.selectdropDownStyle}
                            onChangeItem={item => selectUser(item)}
                        />
                    </>) : (<>
                        <Text>{Object.values(props.ArrayClienti[0])[1] === 'undefined' ? "errore" : Object.values(props.ArrayClienti[0])[0]}</Text>
                    </>)}

                    <Text>Seleziona giorno e ora</Text>
                    {Platform.OS !== 'web' && <>


                        <Button onPress={() => { setDatePickerVisibility(true); setMode('date') }}>Seleziona giorno e ora</Button>
                        {moment().format() === moment(date, true).format() ? (<>
                            <Text>La data scelta è {moment.locale('it'), moment().format('LLLL')}</Text>
                        </>) : (<>
                            <Text>La data scelta è {moment.locale('it'), moment(date).format('LLLL')}</Text>

                        </>)}



                        {/* <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            locale="it_IT" // Use "en_GB" here
                            date={props.modify && supportModify ? new Date(props.date.toDate()) : new Date()}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        /> */}



                        {/* <DateTimePicker
                            testID="dateTimePicker"
                            value={props.modify && supportModify ? new Date(props.date.toDate()) : date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={props.modify && supportModify ? new Date(props.date.toDate()) : date}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        /> */}

                        <Icon
                            raised
                            name='check'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => {
                                if (!props.modify) {
                                    console.log(date);

                                    addAppuntamento();
                                    hideModal();
                                } else {
                                    console.log(date);
                                    // hideModal(date, props.ArrayClienti[0]);
                                }


                            }}
                        />
                    </>}

                    {Platform.OS === 'web' && <>
                        <Text>Inserisci la data con il seguente formato DD/MM/YYY</Text>
                        <TextInput
                            style={style.input}
                            onChangeText={onChangeTextData}
                            value={textData}
                            placeholder={props.modify ? moment(new Date(props.date.toDate())).format('YYYY-MM-DD') : "YYYY-MM-DD"}
                            keyboardType="text"
                        />

                        <Text>Inserisci l'ora con il seguente formato HH:MM</Text>

                        <TextInput
                            style={style.input}
                            onChangeText={setHour}
                            value={hour}
                            placeholder={props.modify ? moment(new Date(props.date.toDate())).format('HH:mm') : "hh:mm"}
                            keyboardType="text"
                        />


                        <Icon
                            raised
                            name='check'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => {
                                if (!props.modify) {
                                    addAppuntamentoWeb();
                                } else {
                                    hideModal(textData + " " + hour, props.ArrayClienti[0]);
                                }

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
        </Provider >
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
