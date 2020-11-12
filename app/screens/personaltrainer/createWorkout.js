import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import HeaderComponent from "../../component/HeaderComponent";
// import ButtonCircleFlottante from "./buttonCircleFlottante";
import Note from "./Note"

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




export default class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
    }
    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <Note/>
        })
        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Schede allenamento" />
                <ScrollView style={styles.scrollContainer}>
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
                </View>  */}
                 <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity> 
            </SafeAreaView>
        );
    }
    addNote() {
            this.state.noteArray.push({
                'data': "data",
                'note': "ciao",
            });
            this.setState({ noteArray: this.state.noteArray });
            // this.setState({ noteText: '' });
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