import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { Modal } from 'react-native-paper';
import DropDown from "react-native-picker-select"
const { width, height } = Dimensions.get('screen');



class Scheda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            setSelectedValue: "java"
        }
    }


    render() {
        var schedaArray = this.props.scheda;
        return (
            <View style={styles.item}>
                <Card style={{ flex: 1 }}>
                    <Card.Title>{schedaArray.day}</Card.Title>
                    <Card.Divider />
                    {/* {scheda.esercizi.map((u, i) => { */}
                    {/* return ( */}
                    <View >
                        <Card.Divider />
                        {schedaArray.esercizi.map((u, i) => {
                            return (
                                <View>
                                
                            <Text>esercizio +{i}</Text>
                                <Card.Divider />
                                <DropDown
                                    onValueChange={(value) => {
                                        this.setState({
                                            selectedValue: value
                                        })
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.selectedValue}
                                    items={[
                                        { label: 'Utente semplice', value: "form_user" },
                                        { label: 'Personal Trainer', value: 'form_pt' },
                                        { label: 'Nutrizionista', value: 'form_nutri' },
                                    ]}
                                />
                                <DropDown
                                    onValueChange={(value) => {
                                        this.setState({
                                            selectedValue: value
                                        })
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.selectedValue}
                                    items={[
                                        { label: 'Utente semplice', value: "form_user" },
                                        { label: 'Personal Trainer', value: 'form_pt' },
                                        { label: 'Nutrizionista', value: 'form_nutri' },
                                    ]}
                                />
                                <DropDown
                                    onValueChange={(value) => {
                                        this.setState({
                                            selectedValue: value
                                        })
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.selectedValue}
                                    items={[
                                        { label: 'Utente semplice', value: "form_user" },
                                        { label: 'Personal Trainer', value: 'form_pt' },
                                        { label: 'Nutrizionista', value: 'form_nutri' },
                                    ]}
                                />
                                </View>
                            );
                        })}


                    </View>
                </Card>
            </View>

            /* <TextInput
                    style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
                />
                <TouchableOpacity >
                    <Text >D</Text>

                </TouchableOpacity> */

        );


    }

}
export default Scheda;
const styles = StyleSheet.create({
    item: {
        width: width / 2,
        height: '30%'
    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});