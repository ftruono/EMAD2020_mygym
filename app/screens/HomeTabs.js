import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Button, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/Entypo";
import Register from './Register';
import { Login } from './Login';





const Tab = createMaterialTopTabNavigator();


export function Tabs() {
   
   
    return (<Tab.Navigator swipeEnabled="true" tabBarOptions={optionsTab}>
        <Tab.Screen name="Login" component={Login} options={({ navigation }) => ({
            tabBarLabel: ({ }) => (
                <View style={styles.iconContainer}>
                    <Icon name="login" color="#fff" size={22} />
                    <Text style={{ color: "#fff" }}>Login</Text>
                </View>
            ),
        })} />
        <Tab.Screen name="Register" component={Register} options={({ navigation }) => ({
            tabBarLabel: ({ }) => (
                <View style={styles.iconContainer}>
                    <Icon name="pencil" color="#fff" size={22} />
                    <Text style={{ color: "#fff" }}>Registrati</Text>
                </View>
            ),
        })} />
    </Tab.Navigator>);
}

const optionsTab = {
    style: {
        height: 60,
        backgroundColor: '#40404c',
        paddingBottom: 3,
        paddingTop: 3,

    },
    indicatorStyle: {
        backgroundColor: '#fff',
        elevation: 10,
    },
    activeTintColor: '#fff',
    inactiveTintColor: 'white',
    showIcon: true,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});