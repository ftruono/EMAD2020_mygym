import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

import DropDown from "react-native-picker-select";
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');



const Scheda = (props) => {
    const [selectEsercizio, setTextEsericizio] = React.useState('');
    const [textRipetizioni, setTextRipetizioni] = React.useState('');
    const [textColpi, setTextColpi] = React.useState('');
    const [textRecupero, setTextRecupero] = React.useState('');
   
    var schedaArray = props.scheda;
    var index = props.index;
    const salva=(num,es,val)=> props.aggiungiValori(schedaArray.day,num,es,val);
    // const setIniziale=()=>{if(schedaArray.esercizi.ripetizioni!='') setTextRipetizioni(schedaArray.esercizi.ripetizioni)}
    //     if(schedaArray.esercizi.colpi!=null)
    //     if(schedaArray.esercizi.recupero!=null))}
    // textRipetizioni=
    // textColpi
    // textRecupero;
    

    return (

        <View style={styles.item}>
            <Card style={{ flex: 1 }}>

                <Card.Title>Day {schedaArray.day}</Card.Title>
                <View >
                    {schedaArray.esercizi.map((u, i) => {
                        
                        return (
                            <View>
                                {console.log(index)}
                                <Text>esercizio +{i}</Text>
                                <Card.Divider />
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <DropDownPicker
                                        onChangeItem={(value) => (setTextEsericizio(value.value), salva(i,'0',value.value))}
                                        placeholder="Seleziona un esercizio"

                                        value={selectEsercizio}
                                        items={[
                                            { label: 'panca piana', value: "panca_piana" },
                                            { label: 'panca alta', value: 'panta_alta' },
                                            { label: 'croci', value: 'croci' },
                                        ]}
                                    />
                                    <TextInput
                                        label="Inserisci le ripetizioni"
                                        value={textRipetizioni}
                                        // style={style.textInputSyle}
                                        onChangeText={(text) => (setTextRipetizioni(text))}
                                        onBlur={()=>salva(i,'1',textRipetizioni)}
                                    />
                                    <TextInput
                                        label="Inserisci i colpi"
                                        value={textColpi}
                                        // style={style.textInputSyle}
                                        onChangeText={(text) => (setTextColpi(text))}
                                        onBlur={()=>salva(i,'2',textColpi)}
                                    />
                                    <TextInput
                                        label="Inserisci il recupero"
                                        value={textRecupero}
                                        // style={style.textInputSyle}
                                        onChangeText={(text) => (setTextRecupero(text))}
                                        onBlur={()=>salva(i,'3',textRecupero)}
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
        width: width / 2,

    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});