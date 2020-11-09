import React, { Component } from 'react';
import { TouchableOpacity, View,TextInput, Text,StyleSheet,Modal } from 'react-native';


class ModalEvent extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    closeModal = () => {
       //TODO da fare  
    }

     renderLock = () => {
        alert("Click save")
      } 
    render(){

        var eventiX = JSON.parse(this.props.event);
        var eventoSelected =[];
        eventoSelected.push(eventiX.find(item=>item.day=="2020-11-04"));
        //Gestire lato user
        console.log(global.userType)
            return (
                
                eventoSelected.map((u)=> u.evento.map((u)=>
                    <Modal
                        animationType = {"slideInUp"}
                        transparent={false}
                        visible={this.props.isModalVisible}>
                            <View style={styles.containerModal}>
                            <Text style={styles.textLogin}>Inserisci un nuovo evento</Text>
                            <Text style={styles.textLogin}>Data: {this.props.date}</Text>
                                <Text style={styles.text}>Titolo evento:</Text>
                                    <View style={styles.action}>
                                        <TextInput
                                            placeholder="Inserisci titolo evento"
                                            placeholderTextColor="#666666"
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChange={(event) => this.setState({eventTitol:event.nativeEvent.text})}
                                            value={u.titolo}
                                        />
                                    </View>

                                <Text style={[styles.text]}>Durata</Text>
                                    <View style={styles.action}>
                                        <TextInput
                                            placeholder="Inserisci la sua durata"
                                            placeholderTextColor="#666666"
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChange={(event) => this.setState({duration:event.nativeEvent.text})}
                                            value={u.durata}
                                        />
                                    </View>

                                <Text style={[styles.text]}>Descrizione</Text>
                                    <View style={styles.action}>
                                        <TextInput
                                            placeholder="Inserisci decrizione/link alla stanza"
                                            placeholderTextColor="#666666"
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChange={(event) => this.setState({description:event.nativeEvent.text})}
                                            value={u.descrizione}
                                        />
                                    </View>
                                
                                <View style={styles.action}>
                                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 150 }]} onPress={this.closeModal}>
                                        <Text style={styles.appButtonText}>Chiudi</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 150,marginLeft:75 }]} onPress={this.renderLock}>
                                        <Text style={styles.appButtonText}>Salva</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </Modal>
                    ))
            );
    };
}
export default ModalEvent;


const styles = StyleSheet.create({
      containerModal: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textLogin: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop:30
    },
      text: {
        color: '#05375a',
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 35
      },
      action: {
        flexDirection: 'row',
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
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