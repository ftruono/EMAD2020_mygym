import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import { Card } from 'react-native-elements';


export default class ViewSingleDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    save = () =>{
        this.setState({modify:false})
        alert("Hai cliccato su salva")
    }

    render() {
        
        const exercise = [];
        var schedaEsercizio = this.props.route.params;
        var esercizi = schedaEsercizio.esercizi;
        var nomeEsercizio = esercizi.map((u) => u.esercizio) ;
        var ripetizioni = esercizi.map((u) => u.ripetizioni);
        var colpi = esercizi.map((u) => u.colpi);
        var recupero = esercizi.map((u) => u.recupero);
        
         for(let i=0; i < nomeEsercizio.length; i++) {
            exercise.push({
                eser: 'Tipo esercizio: ' + nomeEsercizio[i],
                rec: 'Recupero: ' + recupero[i] + ' secondi',
                ripetizioni: ripetizioni[i] + ' volte ' + '* ' + colpi[i] + ' ripetizioni'
            })
        } 

        return(
            <SafeAreaView style={styles.viewDay}>
            <HeaderComponent {...this.props} title="Allenamento" />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textHeader}>Visualizzazione</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.textTitle}>Day {esercizi[0].day}</Text>
                    </View>
                    {exercise.map((u,i) =>(
                        <View key={i}>
                            <Text style={styles.titleThParagraph}>Esercizio {i+1}</Text>
                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={false}
                                value={u.eser}
                            />

                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={false}
                                value={u.ripetizioni}
                            />
                            
                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={false}
                                value={u.rec}
                            />

                            <Card.Divider />
                        </View>
                    ))}
                </View>
                </ScrollView>
                <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.props.navigation.navigate("IniziaAllenamento", { schedaEsercizio: schedaEsercizio }) }}>
                        <Text style={styles.appButtonText}>Inizia Allenamento</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    viewDay: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 2,
        paddingHorizontal: 10,
        marginTop: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    textTitle: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 30,
        fontWeight: "bold"
    },
    textHeader: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop:15
    },
    text: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 15,
    },
    appButtonSave: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        width: 300,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#ff6c16',
        borderColor:'#ff6c16',
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
    titleThParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:15
     }
})