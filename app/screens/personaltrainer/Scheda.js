import React from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

import DropDown from "react-native-picker-select";




const { width, height } = Dimensions.get('screen');
const Scheda = (props) => {
    let scheda = props.scheda;
    let salva = (num, es, val) => props.aggiungiValori(scheda.day, num, es, val);
    let selectDay = (day) => (props.daySelected(day), console.log("ciao"));


    const onlyNumber = (num, es, text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
                salva(num, es, text);
            }
            else {
                alert("si prega di inserire solo numeri");
            }
        }
        
    }


    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => selectDay(scheda.day)} style={{ activeOpacity: 0.10, enabled: false }}>
                <Card style={{ flex: 1 }}>
                    <Card.Title>Day {scheda.day + 1}</Card.Title>
                    <View >
                        {scheda.esercizi.map((u, i) => {
                            return (
                                <View>
                                    <Text>esercizio {i + 1}</Text>
                                    <Card.Divider />
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <DropDownPicker
                                            onChangeItem={(value) => salva(i, '0', value.value)}
                                            placeholder="Esercizio"
                                            style={styles.textInput}
                                            value={u.esercizio}
                                            items={[
                                                { label: 'Panca Piana', value: "Panca_Piana" },
                                                { label: 'Panca Alta', value: 'Panca_Alta' },
                                                { label: 'Croci', value: 'Croci' },
                                                { label: 'Alzate laterali', value: 'Alzate laterali' },
                                                { label: 'Shoulder press', value: 'Shoulder press' },
                                                { label: 'Alzate frontali', value: 'Alzate frontali' },
                                                { label: 'Rematore verticale', value: 'Rematore verticale' },
                                                { label: 'Stacchi da terra', value: 'Stacchi da terra' },
                                                { label: 'Trazioni alla sbarra', value: 'Trazioni alla sbarra' },
                                                { label: 'Lateral Pulley', value: 'Lateral Pulley' },
                                                { label: 'Lat machine', value: 'Lat machine' },
                                                { label: 'Squat', value: 'Squat' },
                                                { label: 'Leg Extension', value: 'Leg Extension' },
                                                { label: 'Leg Curl', value: 'Leg Curl' },
                                                { label: 'Affondi frontali', value: 'Affondi frontali' },
                                                { label: 'Affondi laterali', value: 'Affondi laterali' },
                                                { label: 'Distensioni con bilanciere', value: 'Distensioni con bilanciere' },
                                                { label: 'Distensioni con manubri', value: 'Distensioni con manubri' },
                                                { label: 'Chest Press', value: 'Chest Press' },
                                                { label: 'Chest Press Incline', value: 'Chest Press Incline' },
                                                { label: 'Pectoral Machine', value: 'Pectoral Machine' },
                                                { label: 'Piegamenti sulle braccia', value: 'Piegamenti sulle braccia' },
                                                { label: 'Croci ai cavi', value: 'Croci ai cavi' },
                                                { label: 'Curl con bilanciere', value: 'Curl con bilanciere' },
                                                { label: 'Curl con manubri', value: 'Curl con manubri' },
                                                { label: 'Curl a martello', value: 'Curl a martello' },
                                                { label: 'French Press', value: 'French Press' },
                                                { label: 'Panca presa stretta', value: 'Panca presa stretta' },
                                            ]}
                                        />
                                        <TextInput
                                            label="Ripetizioni"
                                            value={u.ripetizioni}
                                            style={styles.textInput}
                                            onChangeText={(text) => onlyNumber(i, '1', text)}

                                        />
                                        <TextInput
                                            label="Colpi"
                                            value={u.colpi}
                                            style={styles.textInput}
                                            onChangeText={(text) => onlyNumber(i, '2', text)}
                                        />
                                        <TextInput
                                            label="Recupero"
                                            value={u.recupero}
                                            style={styles.textInput}
                                            onChangeText={(text) => onlyNumber(i, '3', text)}
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    );
}


export default Scheda;
const styles = StyleSheet.create({

    item: {
        width: width > 1000 ? width / 2 : width - 10,
    },
    textInput: {
        width: width > 1000 ? width / 9 : width / 5,
    }
});