import React, { Component } from 'react';
import { View, Text, Button, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/Entypo";
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Firestore } from "../../config/FirebaseConfig";





class Statistiche extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            misure: [],
            valori: [],
            date: [],
            parteCorpo: ''
        }
        this.getValori()
    }

    getMisure = async (id) => {
        const valori = (await Firestore.collection('MISURAZIONI').doc(id).get()).data();

        this.state.misure.push(valori)
        var support = this.state.misure;
        this.setState({ misure: support });

    }
    getValori = async () => {
        const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();

        user.misure.map((e, i) => {
            this.getMisure(e);
        })

    }

    selectValori = (item, data) => {

        this.state.parteCorpo = item;
        var support = this.state.parteCorpo;
        this.setState({ parteCorpo: support });

        // console.log("valori",support)

        this.state.valori=[];
        var support = this.state.valori;
        this.setState({ valori: support });

        console.log(this.state.valori)
        data.map((array, i) => {
            array.map((singleItem, x) => {
                if (item === singleItem.tipo) {
                    this.state.valori.push(singleItem.valore)
                    var support = this.state.valori;
                    this.setState({ valori: support });
                }

            })
        })
        console.log("data", this.state.valori);
    }

    render() {
        var label = [], data = [], item = [];

        this.state.misure.map((e, i) => {
            label.push(new Date(e.data.toDate()).toDateString());
            data.push(e.valori)
        })
        if (this.state.misure.length != label.length) {
            return null
        } else {
            data = (Object.values(data));

            data.map((array, i) => {
                array.map((singleItem, x) => {

                    if (item.indexOf(singleItem.tipo) < 0) {
                        item.push(singleItem.tipo)
                    }
                })
            })
            console.log(item)

            item.map((element, i) => {
                item[i] = { label: element, value: element }
                console.log(element, i)
            });

            return (
                <SafeAreaView style={styles.container}>
                    <HeaderComponent {...this.props} title="Statistiche" />
                    <View style={styles.containerModal}>
                        <DropDownPicker
                            items={item}
                            placeholder="Seleziona una parte del corpo"
                            defaultValue={this.state.parteCorpo}
                            containerStyle={{ height: 40 }}
                            style={styles.selectStyle}
                            itemStyle={styles.selectStyle}
                            dropDownStyle={styles.selectdropDownStyle}
                            onChangeItem={item => { this.selectValori(item.value, data) }}
                        />
                        <Text>Grafico</Text>
                        <Text>Bezier Line Chart</Text>
                        <LineChart
                            data={{
                                labels: label,
                                datasets: [
                                    {
                                        data: this.state.valori
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="cm"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#000000",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#6b6761",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                yAxisLabel:" ",
                                yAxisSuffix:"cm",
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
                        <Button title="Open drawer" onPress={() => { this.prova(), this.props.navigation.openDrawer() }} />
                    </View>
                </SafeAreaView>

            );
        }
    }
}




const styles = StyleSheet.create({
    // warpDay: { width: width > 1000 ? width / 7 - 7 : screenWidth / 6 - 6 },
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
    },
    modal: { backgroundColor: 'transparent', padding: 20, },
    selectStyle: { backgroundColor: '#fafafa', },
    selectdropDownStyle: { backgroundColor: '#fafafa', },
    itemSelectStyle: { justifyContent: 'flex-start', },
    button: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: '#ff6c16',
        borderColor: 'black',
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
});

export default Statistiche;