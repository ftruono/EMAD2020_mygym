import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import DropDown from "react-native-dropdown-picker"
import Icon from "react-native-vector-icons/Octicons"
import Clock from '../../component/Clock';


export default class IniziaAllenamento extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
            index: 0
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
                                <Text style={[styles.textTitle,{marginTop:35,marginLeft:45}]}>Ripetizioni: {ripetizioni[this.state.index]}</Text>
                                <Text style={[styles.textTitle,{marginTop:35,marginLeft:45}]}>Colpi: {colpi[this.state.index]}</Text>
                            </View>
                            <View style={styles.action}>
                                <DropDown
                                    items={[
                                        { label: 'Scegli un peso', value: '' },
                                        { label: '10 Kg', value: '10' },
                                        { label: '20 Kg', value: '20' },
                                        { label: '30 Kg', value: '30' },
                                    ]}
                                    placeholder="Scegli un peso"
                                    containerStyle={{height: 40,width:200}}
                                    style={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        selectedValue: item.value
                                    })}
                                />
                            </View>
                                </>):(
                                    <>
                                        <View style={styles.alert}>
                                            <TouchableOpacity style={{ marginTop: 15 }} onPress={this.renderHome}>
                                                <Icon name="alert" color="red" size={50}></Icon>
                                            </TouchableOpacity>
                                            <Text style={[styles.textHeader,{marginTop:15}]}> Allenamento Completato !!!!</Text>
                                        </View>
                                    </>
                                )}
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.appButtonSave} onPress={this.incrementIndex}>
                        <Text style={styles.appButtonText}>Prossimo esercizio</Text>
                </TouchableOpacity>
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
    appButtonSave: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        width: 250,
        height: 45,
        borderRadius: 30,
        backgroundColor: 'black',
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: 'black',
        borderColor:'black',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 20,
        color: "#ff1408",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})