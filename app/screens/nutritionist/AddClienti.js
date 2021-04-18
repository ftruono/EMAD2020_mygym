import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput, Paragraph, Dialog } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Firestore,FirebaseAutentication } from "../../config/FirebaseConfig";



const AddClienti = (props) => {


    const [visible, setVisible] = React.useState(props.visible);
    const [check, setCheck] = React.useState('-1');
    const [user, setUser] = React.useState('');

    const hideModal = () => { setVisible(false), props.hidenAddClienti() };
    const hideAcceptModal = async () => {
        let support = [];
        var uid = FirebaseAutentication.currentUser.uid
        let nt = (await Firestore.collection('UTENTI').doc(uid).get()).data();
        support = nt.clienti;
        support.push(props.ArrayUid[check]);

        Firestore.collection('UTENTI').
            doc(uid).
            update({
                'clienti': support,
            }).then(() => {
                console.log('User updated!');
            });

        setVisible(false);
        props.hidenAddClienti();
        props.refreshPage();
        setCheck('-1');
        setUser('');
    };



    const checkUser = async () => {
        const index = props.ArrayClienti.indexOf(user)
        if (0 > index) {
            alert("non trovato");
            setCheck('-1');
            setUser('');
        } else {
            setCheck(index);
        }
    }


    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
                    {check < 0 ? (<>
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
                        <Text>Sicuro che vuoi aggiungere?</Text>
                        <Button icon="check" mode="contained" onPress={() => setCheck('-1'), hideAcceptModal}>
                            Accetta
                        </Button>
                        <Button icon="check" mode="contained" onPress={() => {setCheck('-1'), setUser('')}}>
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