import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,SafeAreaView,TouchableOpacity,Modal} from 'react-native';
import HeaderComponent from "../../component/HeaderComponent"

export default class DatiPersonaliUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <SafeAreaView>
            <HeaderComponent {...this.props} title="Dati Personali" />
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
            </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        paddingHorizontal: 20,
        marginTop: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
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
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});