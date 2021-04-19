import * as React from 'react';

import { Icon } from 'react-native-elements';
import { Modal, Portal, Button, Provider, View, Dialog } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, Platform, TextInput, Text } from 'react-native';




const ConfirmDialog = (props) => {

    const [visible, setVisible] = React.useState(props.visible);

    const hideDialog = () => { setVisible(false) };


    return (

        <Provider>
            <Portal styel={{ padding: 20, }}>

                <Dialog visible={props.visible} onDismiss={hideDialog} contentContainerStyle={style.modal}>
                    <Dialog.Title> {props.text != undefined ? props.text : ''} </Dialog.Title>

                    <Dialog.Actions>
                        <Button icon="camera" mode="contained" onPress={() => props.hidenConfirmDialog}>NO</Button>
                        <Button icon="check" mode="contained" onPress={() => console.log("chekc"), props.check}>SI</Button>
                    </Dialog.Actions>
                </Dialog>


            </Portal>
        </Provider>
    );
};


const style = StyleSheet.create({
    modal: { backgroundColor: 'white', padding: 20, },

})
export default ConfirmDialog;
