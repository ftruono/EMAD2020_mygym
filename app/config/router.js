import {createAppContainer} from "react-navigation";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Icon from "react-native-vector-icons/Entypo";
import React, {Component} from 'react'; 
import {View,Text,StyleSheet} from 'react-native';


const Tabs = createMaterialTopTabNavigator({
    Login: {
        screen:Login,
        navigationOptions:{
            tabBarLabel: ({}) => (
                <View style={styles.iconContainer}>
                    <Icon name="login" color="#fff" size={22}/>
                    <Text style={{color:"#fff"}}>Login</Text>
                </View>
            ),
        },
    },
    Register: {
        screen:Register,
        navigationOptions:{
            tabBarLabel: ({}) => (
                <View style={styles.iconContainer}>
                    <Icon name="pencil" color="#fff" size={22}/>
                    <Text style={{color:"#fff"}}>Registrati</Text>
                </View>
            )
        },
    }
},{
    initialRouteName: 'Login',
    lazyload:true,
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            height: 60,
            backgroundColor: '#40404c',
            paddingBottom: 3,
            paddingTop: 3,

        },
        indicatorStyle: {
            backgroundColor: '#fff',
            elevation:10,
        },
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
    }

});

const MainScreenNavigator = createStackNavigator({
    Tabs: {
        screen : Tabs,
        navigationOptions: {
            title: 'MyPocketGym',
            headerStyle: {
                backgroundColor: '#2b2b39',
            }
        }
    }
});

export default createAppContainer(MainScreenNavigator);

const styles = StyleSheet.create({
        iconContainer: {
            justifyContent:'center',
            alignContent:'center',
            alignItems: 'center'
        },
});

