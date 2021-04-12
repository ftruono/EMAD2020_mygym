import React from 'react';
import { View, Text, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Firestore,FirebaseAutentication } from "../../config/FirebaseConfig";





class Statistiche extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            misure: [],
            valori: [],
            date: [],
            parteCorpo: '',
            noMisure:false
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
        var uid = FirebaseAutentication.currentUser.uid
        const user = (await Firestore.collection('UTENTI').doc(uid).get()).data();
        
        if(user.misure.length != 0) {
            user.misure.map((e, i) => {
                this.getMisure(e);
            })
        } else {
            this.setState({noMisure:true})
        }
        

    }

    selectValori = (item, data) => {

        this.state.parteCorpo = item;
        var support = this.state.parteCorpo;
        this.setState({ parteCorpo: support });

        // console.log("valori",support)


        this.state.valori = [];
        var support = this.state.valori;
        this.setState({ valori: support });

        console.log(this.state.valori)
        data.map((array, i) => {
            array.map((singleItem, x) => {
                if (item === singleItem.tipo) {
                    this.state.valori.push(singleItem.valore)
                    var support = this.state.valori;
                    this.setState({ valori: support });
                this.state.valori.push(singleItem.valore)
                // var support = this.state.valori;
                 this.setState({ valori: this.state.valori });
                }

            })
        })
    }

    render() {

        if(this.state.noMisure == false) {
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
        }
    }
        
        

            return (
                <SafeAreaView style={styles.container}>
                    <HeaderComponent {...this.props} title="Statistiche" />
                    <View style={styles.containerModal}>
                    {this.state.noMisure ? (
                            <>
                                <Text style={styles.titleSubParagraph}> Non hai abbastanza dati per la creazione di un grafico</Text>

                            </>
                        ):(
                            <>
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
                        
                        <Text style={styles.titleParagraph}>Grafico</Text>
                        <LineChart
                            data={{
                                labels: label,
                                datasets: [
                                    {
                                        data: this.state.valori
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width-40} // from react-native
                            width={Dimensions.get("window").width - 40} // from react-native
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
                                yAxisLabel: " ",
                                yAxisSuffix: "cm",
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
                        </>
                        )}
                    </View>
                </SafeAreaView>

            );
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
    titleParagraph: {
        fontSize:30,
        fontWeight:'bold',
        textAlign:'left',
        marginTop:25
     },
    selectStyle: { 
        backgroundColor: '#fafafa', 
    },
    selectdropDownStyle: { 
        backgroundColor: '#fafafa', 
    },
    titleSubParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:50
     }
});

export default Statistiche;