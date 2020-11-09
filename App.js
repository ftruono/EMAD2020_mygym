import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Button, Text } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import DrawerNavigator from './app/config/AppNavigator';
import { AuthContex } from './app/config/GlobalConfig';




const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



function Tabs() {
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



export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Tabs} options={{headerTintColor: 'white',headerStyle: { backgroundColor: 'red' },}}/>
          <Stack.Screen name="Menu" component={DrawerNavigator} options={{headerTintColor: 'white',headerStyle: { backgroundColor: 'red' },headerLeft:()=>(
          <Icon name="menu"
              onPress={() => this.props.params.navigation.openDrawer()} //TODO VA FIXATO!@nellop97
              title="Info"
              color="#fff"
               size={20}
            ></Icon>
            ),
            } } >

            </Stack.Screen>
        </Stack.Navigator>

      </NavigationContainer>



  );
};

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
