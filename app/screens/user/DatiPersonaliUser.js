import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import { Card } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent"

export default class DatiPersonaliUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addElement:false
        }
    }

    addElements = ()=>{
        this.setState({addElement: true})
    }

    changeState= (status) =>{
        this.setState({addElement:status})
    }

    renderForm(params) {
        switch(params) {
            case true:
                return (
                        <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={styles.textLogin}>Torace:</Text>
                            <TextInput
                                    placeholder="Inserisci il valore"
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                            />
                            <Text style={{color:'blue', textDecorationLine: "underline"}}>Vedi statistiche</Text>
                        </View>    
                )
            default: null
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.datiPersonali}>
            <HeaderComponent {...this.props} title="Dati Personali" />
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textHeader}>Dati personali</Text>
                    <View style={styles.action}>
                        <Text style={styles.textLogin}>Peso:</Text>
                            <TextInput
                                placeholder="Inserisci il peso"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"

                            />
                            <Text style={{color:'blue', textDecorationLine: "underline"}}>Vedi statistiche</Text>
                    </View>

                    <View style={{marginTop:15}}>
                    <Card style={{ flex: 1 }}>
                        <Card.Title>Set Palestra</Card.Title>
                        <Card.Divider />
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.textLogin}>Braccia:</Text>
                            <TextInput
                                    placeholder="Inserisci il valore"
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    autoCapitalize="none"

                            />
                            <Text style={{color:'blue', textDecorationLine: "underline"}}>Vedi statistiche</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={styles.textLogin}>Gambe:</Text>
                            <TextInput
                                    placeholder="Inserisci il valore"
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    autoCapitalize="none"

                            />
                            <Text style={{color:'blue', textDecorationLine: "underline"}}>Vedi statistiche</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={styles.textLogin}>Spalle:</Text>
                            <TextInput
                                    placeholder="Inserisci il valore"
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    autoCapitalize="none"

                            />
                            <Text style={{color:'blue', textDecorationLine: "underline"}}>Vedi statistiche</Text>
                        </View>

                        {this.renderForm(this.state.addElement)}
                        
                    </Card>
                    </View>

                    <View style={styles.button}>
                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 450, width: 50, marginLeft: 250 }]} onPress={this.addElements}>
                        <Text style={styles.appButtonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 20, width: 150, marginLeft: 200 }]}>
                        <Text style={styles.appButtonText}>Salva</Text>
                    </TouchableOpacity>
                    </View>

            </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    datiPersonali: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 2,
        paddingHorizontal: 20,
        marginTop: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    button: {
        float: 'right',
        marginTop: 30
    },
    textLogin: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: "bold"
    },
    textHeader: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop:30
    },
    textInput: {
        flex: 1,
        marginTop: 4,
        paddingLeft: 15,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    appButtonContainer: {
        paddingHorizontal:19,
        paddingVertical:12,
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'black',
        borderColor:'black'
    },
    appButtonText: {
        fontSize: 20,
        color: "#ff1408",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});