import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, withTheme } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo";
import { SafeAreaView } from 'react-navigation';

class DietaComponent extends React.Component {
    
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const state=(global.userType == 'NT') ? true : false;
        return (
            <SafeAreaView style={{flex:1}}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Dieta")}}>
            <Card style={{ flex: 1 }}>
                <Card.Title>{this.props.item.nome}</Card.Title>
                <Card.Divider />
                    <View style={styles.body}>
                        <Text>{this.props.item.contenuto}</Text>
                    </View>
            </Card>
            </TouchableOpacity>
       </SafeAreaView>

            

        );
    }
}


export default DietaComponent;

const styles = StyleSheet.create({
    title:{
       fontSize:24,
       fontWeight:'bold',
       textAlign:'center',
       
    },
    inputs:{
        padding:10
    },
      inputContainer: {
        borderColor:'#000000',
        borderWidth:0.5, 
        borderRadius:20,  
        backgroundColor:'#FFFFFF',
        height:45,
        width:'80%',
        marginVertical:10
    },
    body: {
        alignItems: 'center',
        flex: 0.8
    }
});