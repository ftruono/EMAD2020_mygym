import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { RefreshControl, SafeAreaView } from 'react-navigation';
import HeaderComponent from "../../component/HeaderComponent";
import ButtonCircleFlottante from './buttonCircleFlottante';
import Scheda from './Scheda';

class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedaArray: []
        };
    }
    // {
    //     day: 'day1',
    //     esercizi: [{
            // esercizio1: 'panca piana 5*10',
            // recupero: '30sec',
    //     }, {
    //         esercizio1: 'panca alta 5*10',
    //         recupero: '30sec',
    //     }]
    // }

    addDay = () => {
        let lunghezza=this.state.schedaArray.length;
        let newArray = [...this.state.schedaArray, {
            day: "day "+lunghezza+1, esercizi: [{esercizio1: 'panca piana 5*10'},]
        }];
        console.log("new array day->"+newArray);

        this.setState({ schedaArray: newArray });
        console.log("new state day->"+this.state.schedaArray);


    };
    addEsercizio=()=>{
        var newArray = [...this.state.schedaArray]
        console.log(newArray)
        var day=newArray.day;
        // let l=newArray.esercizi.length();
        let x=newArray.esercizi;
        newArray.map((u, i) => {
            console.log("esercizi->"+u.esercizi);
        })
        console.log("day->"+day+"esercizi->"+x);

        var newArray2 = [...newArray.esercizi,{}]

        console.log(newArray2)
    }
    
    
    render() {
        const { schedaArray } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Schede allenamento" />


                    <FlatList style={{ margin: 10, flex: 0.5 }}
                        data={schedaArray}
                        scrollEnabled={true}
                        numColumns={2}
                        keyExtractor={(item, index) => item.day}
                        onRefresh={this.state.isRefreshing}
                        refreshing={this._onRefresh}
                        renderItem={({ item }) => (
                            <Scheda scheda={item} />

                        )}

                    />


                {/* <TouchableOpacity onPress={() => this.updateAge()} style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>  */}
                <ButtonCircleFlottante addDay={this.addDay} addEsercizio={this.addEsercizio}/>
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

