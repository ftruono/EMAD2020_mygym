import React from 'react'
import { Dimensions, StyleSheet, View ,TouchableOpacity} from 'react-native'
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

import DropDown from "react-native-picker-select";




const { width, height } = Dimensions.get('screen');
const Scheda = (props) => {
    let scheda = props.scheda;
    let salva = (num, es, val) => props.aggiungiValori(scheda.day, num, es, val);
    let selectDay = (day) => (props.daySelected(day), console.log("ciao"));





    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => selectDay(scheda.day)} style={{activeOpacity:0.10,enabled:false}}>
                <Card style={{ flex: 1 }}>
                    <Card.Title>Day {scheda.day+1}</Card.Title>
                    <View >
                        {scheda.esercizi.map((u, i) => {
                            return (
                                <View>
                                    <Text>esercizio {i+1}</Text>
                                    <Card.Divider />
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <DropDownPicker
                                            onChangeItem={(value) => salva(i, '0', value.value)}
                                            placeholder="Esercizio"
                                            style={styles.textInput}
                                            value={u.esercizio}
                                            items={[
                                                { label: 'panca piana', value: "panca_piana" },
                                                { label: 'panca alta', value: 'panta_alta' },
                                                { label: 'croci', value: 'croci' },
                                            ]}
                                        />
                                        <TextInput
                                            label="Ripetizioni"
                                            value={u.ripetizioni}
                                            style={styles.textInput}
                                            onChangeText={(text) => salva(i, '1', text)}

                                        />
                                        <TextInput
                                            label="Colpi"
                                            value={u.colpi}
                                            style={styles.textInput}
                                            onChangeText={(text) => salva(i, '2', text)}
                                        />
                                        <TextInput
                                            label="Recupero"
                                            value={u.recupero}
                                            style={styles.textInput}
                                            onChangeText={(text) => salva(i, '3', text)}
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
        width: width > 1000 ? width / 2 : width-10,
    },
    textInput: {
        width: width > 1000 ? width / 9 : width/5,
    }
});