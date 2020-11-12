import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { RefreshControl, SafeAreaView } from 'react-navigation';
import HeaderComponent from "../../component/HeaderComponent";


import Scheda from './Scheda';
// import ButtonCircleFlottante from "./buttonCircleFlottante";
import Note from "./Scheda"

const ButtonCircleFlottante = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'calendar-today' : 'plus'}
                    actions={[
                        //   { icon: 'plus', onPress: () => console.log('Pressed add') },
                        //   {
                        //     icon: 'star',
                        //     label: 'Star',
                        //     onPress: () => console.log('Pressed star'),
                        //   },
                        {
                            icon: 'email',
                            label: 'esercizio',
                            onPress: () => console.log('Pressed email'),
                        },
                        {
                            icon: 'bell',
                            label: 'Day',
                            onPress: () => console.log('Pressed notifications'),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
};

var schedaArray = [
    {
        day: 'day1',
        esercizi: [{
            esercizio1: 'panca piana 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'panca alta 5*10',
            recupero: '30sec',
        }]
    }, {
        day: 'day1',
        esercizi: [{
            esercizio1: 'panca piana 5*10',
            recupero: '30sec',
        }, {
            esercizio1: 'panca alta 5*10',
            recupero: '30sec',
        }]
    }
];



export default class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
          };

    }
    onRefresh() {
        this.setState({ isFetching: true });
      }
    // let notes = this.state.schedaArray.map((val, key) => {
    //     // val.scheda.day=key.toString();
    //     console.log(this.schedaArray);
    //     return <Note />
    // })
    render() {

        return (

            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Schede allenamento" />
                {/* <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                 <View style={styles.footer}>
                    <TextInput style={styles.textInput}
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholder='<allenamento<'
                        placeholderTextColor='white'
                        underlinColorAndroid='trasparent'>

                    </TextInput>
                </View> 
                {/* <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <ButtonCircleFlottante />
                </View>  */ }

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
                    {console.log("qua")}
               



                <TouchableOpacity onPress={this.addElement.bind(this.schedaArray)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

        );
    }

    // addElement = () => {
    //     var newArray = [...initialElements, { id: idx, text: "Object " + (idx + 1) }];
    //     incr(idx + 1);
    //     console.log(initialElements.length);
    //     setExampleState(newArray);
    //     changeEl(newArray);
    // }
    addElement(array) {
        // array.map((element) => {
        //     console.log(element);
        // })

        console.log(schedaArray)
        schedaArray.push(
            {
                day: "day2", esercizi: [{
                    esercizio1: 'panca piana 5*10',
                    recupero: '30sec',
                }, {
                    esercizio1: 'panca alta 5*10',
                    recupero: '30sec',
                }]
            }
        );
      
        console.log("riga 162" );
            // onRefresh();
        console.log("riga 165" );
        // if (onRefresh) {
        //     onRefresh = false;
        // }
        // console.log("riga 169" + onRefresh);


        // this.setState({ noteArray: this.state.schedaArray });
        // this.setState({ noteText: '' });
    }
    _onRefresh=()=>{
        this.setState({isRefreshing:true},()=>{
            setTimeout (()=> {
                this.setState({isRefreshing:false});
            },2000);
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 0,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    }
})