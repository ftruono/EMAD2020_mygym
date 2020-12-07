import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Calendar from "react-native-customize-selected-date"
import Icon from "react-native-vector-icons/FontAwesome"
import _ from "lodash"
import ModalEvent from '../../component/ModalEvent'
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore } from '../../config/FirebaseConfig';



const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height


export default class LiveCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            data: '',
            day_event: [],
            lista_eventi: [],
            indice: 0,
        }
        this.getAllDay();
        this.updateEvento();
    }

    onSelectDate = (date) => {
        var support = []
        this.state.lista_eventi.forEach(element => {
            if (element.day === date) {
                support.push(element)
            }
        });
        if (support.length == 0) {
            support = [{
                day: date,
                ora:'',
                descrizione: '',
                durata: '',
                id_creatore: '',
                titolo: '',
            }]
        }
        console.log(date)
        console.log(support[0])
        this.setState({ isModalVisible: true, data: date, day_event: support[0] })
    }

    renderChildDay = (day) => {
        var flag = 0;
        this.state.lista_eventi.map((e, i) => {
            if (day === e.day) {
                flag = flag + 1;
            }
        })
        if (flag > 0) {
            return <Text name="lock" style={styles.icLockRed} > {flag}</Text>
        }
    }
    selectEvento = (i) => {
        if (this.state.indice + i >= 0) {
            if (this.state.indice + i < this.state.lista_eventi.length) {
                this.setState({ isModalVisible: true, data: this.state.data, day_event: this.state.lista_eventi[this.state.indice + i], indice: this.state.indice + i })
            }
        }

    }

    getEvento = async () => {
        const user = (await Firestore.collection('EVENTI'));
        // var myTimestamp = firebase.firestore.Timestamp.fromDate(user);
        
        // console.log(user.day.toDate());
        console.log(user);
    }
    getAllDay = async () => {
        this.setState({ day_event: [],lista_eventi:[] });
        var support;
        const eventi = Firestore.collection('EVENTI').get()
            .then(querySnapshot => {
                querySnapshot.forEach(element => {
                    this.state.lista_eventi.push(element.data());
                    var support = this.state.lista_eventi;
                    this.setState({ lista_eventi: support });
                });
            })
    }

    getAdd = async (evento) => {
        this.setState({ isModalVisible: false })

        Firestore.collection('EVENTI').add(
            evento
        ).then(() => {
            this.setState({ lista_eventi: [] });
            this.getAllDay()
        });
    }
    addDay = (data) => {
        var support = {
            day: data,
            ora:'',
            descrizione: '',
            durata: '',
            id_creatore: '',
            titolo: '',
        }

        console.log(support)
        this.setState({ isModalVisible: true,data: this.state.data, day_event: support })

    }
    updateEvento=(evento)=>{
     
        // var ref = Firestore.collection('EVENTI')
        Firestore.orderByChild("day").equalTo('p').on("titolo", function(snapshot) {
          console.log(snapshot);
        });
        //   .update({
        //   day: '31-10-1100',
        // })
        // .then(() => {
        //   console.log('User updated!');
        // });
        
        // collection('EVENTI').get()
        // .then(querySnapshot => {
        //     querySnapshot.forEach(element => {
        //         this.state.lista_eventi.push(element.data());
        //         var support = this.state.lista_eventi;
        //         this.setState({ lista_eventi: support });
        //     });
        // })
    }
    handleModalClose = () => {
        this.setState({ isModalVisible: false,data: this.state.data, indice:0 })
    }

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Calendario Live" />
                <View style={styles.containerModal}>
                    <Text style={styles.textLogin}>Calendar</Text>
                    <Calendar
                        warpDayStyle={styles.warpDay}
                        customWeekdays={['Dom ', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']}
                        changeDate={(date) => this.onSelectDate(date)}
                        format='YYYY-MM-DD'
                        renderChildDay={(day) => this.renderChildDay(day)}
                    />
                    <ModalEvent isModalVisible={this.state.isModalVisible} getAdd={this.getAdd}
                        day_event={this.state.day_event} handleClose={this.handleModalClose} 
                        selectEvento={this.selectEvento} addDay={this.addDay}/>
                </View>
            </SafeAreaView>
        )
    };
}

const styles = StyleSheet.create({
    warpDay: { width: width > 1000 ? width / 7 - 7 : screenWidth / 6 - 6 },
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    containerModal: {
        flex: 1,
        paddingHorizontal: 20,
    },
    textLogin: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 50,
        marginLeft: 5,
    },
    icLockRed: {
        width: 13 / 2,
        height: 9,
        position: 'absolute',
        top: 2,
        left: 1,
        color: '#008000'
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