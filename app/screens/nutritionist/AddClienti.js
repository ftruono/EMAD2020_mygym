import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Firestore } from "../../config/FirebaseConfig";




const AddClienti = (props) => {

    const [visible, setVisible] = React.useState(props.visible);

    const hideModal = () => { setVisible(false), props.hidenAddClienti() };

    const [user, setUser] = React.useState('')

    const checkUser = async () => {
        console.log("qua---->",props.ArrayClienti)
        if(props.ArrayClienti.find(user)>0){
            alert(props.ArrayClienti.find(user))
        }else{
            alert("non trovato")
        }
    }


    return (
        <Provider>
            <Portal styel={{ padding: 20, }}>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
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
                            hideModal()

                        }} />


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