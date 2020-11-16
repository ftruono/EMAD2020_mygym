import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { RefreshControl, SafeAreaView } from 'react-navigation';
import HeaderComponent from "../../component/HeaderComponent";
import BottoneAddWorkOut from './BottoneAddWorkOut';
import Scheda from './Scheda';

class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedaArray: [],
            selecetDay: Number,
        };
    }



    addDay = () => {
        let lunghezza = this.state.schedaArray.length;

        this.state.schedaArray.push({ day: lunghezza, esercizi: [] })
        var support = this.state.schedaArray;

        this.setState({ schedaArray: support });

    };

    addEsercizio = () => {
        let lunghezza = this.state.schedaArray.length;
        this.state.schedaArray[lunghezza - 1].esercizi.push({ esercizio: '', ripetizioni: '', colpi: '', recupero: '' })
        var support = this.state.schedaArray;
        this.setState({ schedaArray: support });
    }

    aggiungiValori = (daySelect, num, eser, valori) => {
        console.log("day ricevuti->" + daySelect);
        console.log("valori ricevuti->" + valori);
        switch (eser) {
            case '0':
                this.state.schedaArray[daySelect].esercizi[num].esercizio = valori;
                break;
            case '1':
                this.state.schedaArray[daySelect].esercizi[num].ripetizioni = valori;
                break;
            case '2':
                this.state.schedaArray[daySelect].esercizi[num].colpi = valori;
                break;
            case '3':
                this.state.schedaArray[daySelect].esercizi[num].recupero = valori;
                break;
            default:
            // code block
        }

        var support = this.state.schedaArray;
        this.setState({ schedaArray: support });
        console.log("index flat list->" + JSON.stringify(this.state.schedaArray))
        this.setState({ selecetDay: daySelect });
        // alert(daySelect)
    }


    render() {
        const { schedaArray } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Schede allenamento" />


                <FlatList style={{ margin: 10, flex: 1 }}
                    data={schedaArray}
                    scrollEnabled={true}
                    numColumns={2}
                    keyExtractor={(item) => item.day}
                    onRefresh={this.state.isRefreshing}
                    refreshing={this._onRefresh}
                    renderItem={({ item, index }) => (
                            <Scheda scheda={schedaArray[index]} aggiungiValori={this.aggiungiValori} />
                    )}

                />
                <BottoneAddWorkOut addDay={this.addDay} addEsercizio={this.addEsercizio} aggiungiValori={this.aggiungiValori} />
            </SafeAreaView>
        );
    }

}
export default CreateWorkout;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
})

