import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

import DropDown from "react-native-picker-select";
import { TouchableOpacity } from 'react-native-gesture-handler';



const { width, height } = Dimensions.get('screen');
const Scheda = (props) => {
    let scheda = props.scheda;
    let salva = (num, es, val) => props.aggiungiValori(scheda.day, num, es, val);
    let selectDay = (day) => (props.daySelected(day),console.log("ciao"));





    return (
        <View style={styles.item} onClick={() => selectDay(scheda.day)} onPress={() => selectDay(scheda.day)}>
            <Card style={{ flex: 1 }} >
                <Card.Title>Day {scheda.day}</Card.Title>
                <View >
                    {scheda.esercizi.map((u, i) => {
                        return (
                            <View>
                                <Text>esercizio +{i}</Text>
                                <Card.Divider />
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <DropDownPicker
                                        onChangeItem={(value) => salva(i, '0', value.value)}
                                        placeholder="Seleziona un esercizio"

                                        value={u.esercizio}
                                        items={[
                                            { label: 'panca piana', value: "panca_piana" },
                                            { label: 'panca alta', value: 'panta_alta' },
                                            { label: 'croci', value: 'croci' },
                                        ]}
                                    />
                                    <TextInput
                                        label="Inserisci le ripetizioni"
                                        value={u.ripetizioni}
                                        onChangeText={(text) => salva(i, '1', text)}

                                    />
                                    <TextInput
                                        label="Inserisci i colpi"
                                        value={u.colpi}
                                        onChangeText={(text) => salva(i, '2', text)}
                                    />
                                    <TextInput
                                        label="Inserisci il recupero"
                                        value={u.recupero}
                                        onChangeText={(text) => salva(i, '3', text)}
                                    />
                                </View>
                            </View>
                        );
                    })}
                </View>
            </Card>
        </View>
    );
}


export default Scheda;
const styles = StyleSheet.create({

    item: {
        
    
    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});