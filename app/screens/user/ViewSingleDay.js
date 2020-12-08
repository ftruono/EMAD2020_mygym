import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, SafeAreaView, ScrollView, TouchableOpacity, SafeAreaViewBase } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import Icon from "react-native-vector-icons/FontAwesome"


export default class ViewSingleDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modify: false
        }
    }

    setModify = () =>{
        this.setState({modify:true})
    }


    save = () =>{
        this.setState({modify:false})
        alert("Hai cliccato su salva")
    }

    render() {
        
        const exercise = [];
        var schedaEsercizio = this.props.route.params;
        var esercizi = schedaEsercizio.esercizi;
        var nomeEsercizio = esercizi.map((u) => u.nome) ;
        var ripetizioni = esercizi.map((u) => u.ripetizioni);
        var colpi = esercizi.map((u) => u.colpi);
        var recupero = esercizi.map((u) => u.recupero);
        
         for(let i=0; i < nomeEsercizio.length; i++) {
            exercise.push({
                eser: nomeEsercizio[i],
                rec: '      Recupero: ' + recupero[i],
                ripetizioni: ' ' + ripetizioni[i] + '*' + colpi[i]
            })
        } 

        return(
            <SafeAreaView style={styles.viewDay}>
            <HeaderComponent {...this.props} title="Allenamento" />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textHeader}>Visualizzazione</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.textTitle}>{esercizi[0].day}</Text>

                        {/* Il bottone di modifica verrà reso dinamico quando a livello di db ci sarà l'informazione di possibiltà della modifica della scheda*/}
                        <TouchableOpacity onPress={this.setModify} >
                            <Icon name="pencil" color="#05375a" size={20} style={{marginTop:30, marginLeft:50}}></Icon>
                        </TouchableOpacity>
                    </View>
                    {exercise.map((u) =>(
                        <View style={styles.action}>
                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={this.state.modify}
                                value={u.eser}
                            />

                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={this.state.modify}
                                value={u.ripetizioni}
                            />
                            
                            <TextInput
                                placeholderTextColor="#666666"
                                style={styles.text}
                                autoCapitalize="none"
                                editable={this.state.modify}
                                value={u.rec}
                            />
                        </View>
                    ))}
                </View>
                </ScrollView>
                {this.state.modify ?(
                    <>
                <TouchableOpacity style={styles.appButtonSave} onPress={this.save}>
                        <Text style={styles.appButtonText}>Salva</Text>
                </TouchableOpacity>
                </>
                ):(
                    <>
                <TouchableOpacity style={styles.appButtonSave} onPress={() => { this.props.navigation.navigate("IniziaAllenamento", { schedaEsercizio: schedaEsercizio }) }}>
                        <Text style={styles.appButtonText}>Inizia Allenamento</Text>
                </TouchableOpacity>
                </>
                )}
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
    }
})