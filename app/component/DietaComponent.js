import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Header, withTheme } from 'react-native-elements';
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
                   <Text style={styles.title}>{this.props.item.nome}</Text>
                   <TextInput multiline={true} numberOfLines={5} editable={state} defaultValue={this.props.item.content} />
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
       
    }
});