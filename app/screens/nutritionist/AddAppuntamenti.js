import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';




const AddAppuntamenti = (props) => {
    let ArrayClienti = props.ArrayClienti, itemsDropDown = [];

    const [visible, setVisible] = React.useState(props.visible);

    const [date, setDate] = React.useState(new Date());
    const [ora, setOra] = React.useState(new Date());
    const [user, setUser] = React.useState('')

    const [showData, setShowData] = React.useState(true);
    const [showOra, setShowOra] = React.useState(true);
    // const showModal = () => React.setVisible(true);
    const hideModal = () => { setVisible(false), props.hidenAddAppuntamenti() };



    const onChangeOra = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setOra(currentDate);
    };
    const onChangeData = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

//devo aggiungere giorno e ora quando si è sul pc
//sistemare questo back 
//sistemare il back di datipersonaliNT

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
                        onChangeItem={item => {
                            setUser(item.label)

                        }}
                    />
                    <Text>Seleziona giorno e ora</Text>

                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        dateFormat="longdate"
                        RNDateTimePicker locale="it-IT"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeData}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={ora}
                        mode={'time'}
                        dateFormat="longdate"
                        RNDateTimePicker locale="it-IT"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeOra}
                    />
                    <Icon
                        raised
                        name='check'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => {

                            hideModal()

                        }} />


                </Modal>
            </Portal>
        </Provider>
    );
};


const style = StyleSheet.create({
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