import React, { Component } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore, FirebaseAutentication } from "../../config/FirebaseConfig";
import PianiAlimentari from "../nutritionist/PianiAlimentari";
import BottoneNt from "../nutritionist/BottoneNT";
import AddAppuntamenti from '';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export default class Appuntamenti extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        clienti: [],
        appuntamenti: [],
        visibleAddAppuntamenti: false,
        visibleDialog: false,
        ArrayClienti: []

    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <HeaderComponent {...this.props} title="Appuntamenti" />

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.titleParagraph}>I miei Appuntamenti</Text>
                    <TouchableOpacity onPress={() => this.refreshPage()} >
                        <MaterialIcons name="refresh" color="#05375a" size={25} style={{marginTop:25, marginLeft:30}}></MaterialIcons>
                    </TouchableOpacity>
                </View>
                {/* <FlatList style={{ margin: 10 }}
                    data={this.state.appuntamenti}
                    scrollEnabled={true}
                    keyExtractor={(item) => { item.id }}
                    refreshing={this._onRefresh}
                    renderItem={this.renderAppuntamenti}
                />

                <AddAppuntamenti hidenAddAppuntamenti={this.hidenAddAppuntamenti} visible={this.state.visibleAddAppuntamenti} ArrayClienti={this.state.ArrayClienti}
                ArrayUid={this.state.uidClienti} {...this.props} />
                <BottoneNt addAppuntamenti={this.addAppuntamenti} /> */}

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    item: {
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 25,
        marginLeft:10
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    titleParagraph: {
      fontSize:20,
      fontWeight:'bold',
      textAlign:'left',
      marginTop:25,
      marginLeft:15
    }
});