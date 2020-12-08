import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Calendar from "react-native-customize-selected-date"
import Icon from "react-native-vector-icons/FontAwesome"
import _ from "lodash"
import ModalEvent from '../../component/ModalEvent'
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore } from '../../config/FirebaseConfig';
// import {
//     LineChart
// } from "react-native-chart-kit";


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
                ora: '',
                descrizione: '',
                durata: '',
                id_creatore: '',
                titolo: '',
            }]
        }
        console.log(date)
        console.log(support[0])
        this.setState({ isModalVisible: true, data: date, day_event: support[0],indice: 0, })
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
        if (i === "p") {
            console.log(this.state.indice + 1 )
            if (this.state.indice + 1 <= this.state.day_event.length) {

                this.setState({ isModalVisible: true, data: this.state.data, day_event: this.state.day_event[this.state.indice + i], indice: this.state.indice + i })
            }
        } else {
            console.log("m" + this.state.indice - 1)

            if (this.state.indice - 1 >= 0) {

                this.setState({ isModalVisible: true, data: this.state.data, day_event: this.state.day_event[this.state.indice + i], indice: this.state.indice + i })
            }
        }




    }

    getEvento = async () => {
        const user = (await Firestore.collection('EVENTI').where("titolo", "==", "p").where("day", "==", "12-12-2020").get());

        console.log(user.data())
    }
    getAllDay = async () => {
        this.setState({ day_event: [], lista_eventi: [] });
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
        Firestore.collection('EVENTI').add(
            evento
        ).then(() => {
            this.setState({ lista_eventi: [] });
            this.getAllDay()
            this.setState({ isModalVisible: false, data: '', day_event: [], indice: 0 })
        });
    }

    addDay = (data) => {
        var support = {
            day: data,
            ora: '',
            descrizione: '',
            durata: '',
            id_creatore: '',
            titolo: '',
        }
        console.log(support)
        this.setState({ isModalVisible: true, data: this.state.data, day_event: support })

    }
    updateEvento = async (evento) => {

        // var washingtonRef1 = Firestore.collection("EVENTI");
        var washingtonRef2 = Firestore.collection('EVENTI').where("titolo", "==", "p").get().then(oggetto => {
            oggetto.forEach(element => {
                console.log(element.id)
                console.log(this.props.params.user)
            });
        })
        // console.log(washingtonRef1)

        // var ref = Firestore.collection("EVENTI").where("titolo", "==", "p").where("day", "==", "12-12-2020")
        // return washingtonRef2.update({
        //     descrizione: "valore aggiornato nella query",
        // })
        //     .then(function (error) {
        //         if (error.day === "12-12-2020")
        //             console.log("Document successfully updated!");
        //     }).catch(function (error) {
        //         // The document probably doesn't exist.
        //         console.error("Error updating document: ", error);
        //     });

        // Firestore.collection("EVENTI").where("titolo", "==", "p").where("day","==","12-12-2020")
        //     .onSnapshot(function (querySnapshot) {
        //         var cities = [];
        //         querySnapshot.forEach(function (doc) {
        //             cities.push(doc.data().name);
        //         });
        //         console.log("Current cities in CA: ", cities.join(", "));
        //     });
    }
    handleModalClose = () => {
        this.setState({ isModalVisible: false, data: this.state.data, indice: 0 })
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
                        selectEvento={this.selectEvento} addDay={this.addDay} />
                </View>
                {/* <View>
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View> */}
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