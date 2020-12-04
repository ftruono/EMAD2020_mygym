import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import Icon from "react-native-vector-icons/Octicons"
import Clock from '../../component/Clock';
import { TextInput } from 'react-native-paper';


export default class IniziaAllenamento extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
            index: 0,
            peso:''
        }
    }

    incrementIndex = () =>{
        this.setState({ index: this.state.index + 1})
        console.log(this.state.index)
    }

    renderHome = () =>{
        this.setState({ index: 0})
        this.props.navigation.navigate("Menu", { screen: "Home", params: { user: 'XX', userType: 'UT' }})
    }

    render(){
        var schedaArray = this.props.route.params;
        var scheda = schedaArray.scheda;
        var esercizio = scheda.esercizi.map((u) => u.esercizio) ;
        var ripetizioni = scheda.esercizi.map((u) => u.ripetizioni);
        var colpi = scheda.esercizi.map((u) => u.colpi)
        return(
            <SafeAreaView style={styles.viewDay}>
                <HeaderComponent {...this.props} title="Esecuzione" />
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.textHeader}>Esecuzione</Text>
                        <Clock/>
                        {this.state.index < esercizio.length ? (
                           <>
                            <Text style={styles.textTitle}>Tipo Esercizio: {esercizio[this.state.index]}</Text>
                            <View style={styles.action}>
                                <Text style={[styles.textTitle,{marginTop:35}]}>Peso utilizzato: </Text>
                                <TextInput
                                    label="Inserisci il peso"
                                    value={this.state.peso}
                                    onChangeText={(text) => (this.setState({peso:text}))}
                                    style={{width:150}}
                                    //onBlur={invio i dati al db}
                                />
                            </View>
                            <View style={styles.action}>
                                <Text style={[styles.textTitle,{marginTop:20}]}>Ripetizioni: {ripetizioni[this.state.index]}</Text>
                                <Text style={[styles.textTitle,{marginTop:20,marginLeft:35}]}>Colpi: {colpi[this.state.index]}</Text>
                            </View>
                                </>):(
                                    <>
                                        <View style={styles.alert}>
                                            <Icon name="alert" color="red" size={35}></Icon>
                                            <Text style={[styles.textAlert]}> Allenamento Completato !!!!</Text>
                                        </View>
                                    </>
                                )}
                    </View>
                </ScrollView>
                {this.state.index < esercizio.length ? (
                    <>
                <TouchableOpacity style={styles.appButtonSave} onPress={this.incrementIndex}>
                    <Text style={styles.appButtonText}>Prossimo esercizio</Text>
                </TouchableOpacity>
                    </>):(

                <TouchableOpacity style={styles.appButtonSave} onPress={this.renderHome}>
                    <Text style={styles.appButtonText}>Torna alla home</Text>
                </TouchableOpacity>
                    )}
            </SafeAreaView>
        )
    }
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
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    alert: {
        flexDirection: 'row',
        marginTop:70,
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
        marginTop:15,
        textAlign:'center'
    },
    text: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 15,
    },
    textAlert: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
    },
    appButtonSave: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        width: 250,
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