import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Firestore } from "../../config/FirebaseConfig";




const AddClienti = (props) => {

    const [visible, setVisible] = React.useState(props.visible);
    const [check, setCheck] = React.useState(false);
    const [user, setUser] = React.useState('');

    const hideModal = () => { setVisible(false), props.hidenAddClienti() };



    const checkUser = async () => {
        console.log(Object.values(props.ArrayClienti))
        // if (0 > props.ArrayClienti.user.indexOf(user)) {
            // alert("non trovato")
        // } else {
            // setCheck(true);
        // }
    }

    const addCliente = async () => {
        let nt = (await Firestore.collection('UTENTI').doc('PdlCUX3dqLNDqp4gcRD0awdAJ0t2').get()).data();
        nt.clienti.push(user)
        
        console.log()
        // Firestore.collection(
            // 'UTENTI'
        // ).doc(
            // 'PdlCUX3dqLNDqp4gcRD0awdAJ0t2'
        // ).update({
            // 'diete': user.appuntamenti,
        // }).then(() => {
            // console.log('User updated!');
        // });



            hideModal()

    }

    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
                    {check === false ? (<>
                        <TextInput
                            label="Scrivi il nome dell'utente"
                            value={user}
                            onChangeText={text => setUser(text)}
                        />

                        <Icon
                            raised
                            name='check'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => {
                                checkUser()

                            }} />
                    </>) : (<>
                        <Text>Sicuro che vuoi aggiungere {user}?</Text>
                        <Button icon="check" mode="contained" onPress={() => addCliente()}>
                            Accetta
                        </Button>
                        <Button icon="check" mode="contained" onPress={() => setCheck(false)}>
                            Rifiuta
                        </Button>
                    </>)}



                </Modal>
            </Portal>
        </Provider>
    );
};


const style = StyleSheet.create({
    modal: { backgroundColor: 'white', padding: 20, },
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
    }
})
export default AddClienti;