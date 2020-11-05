import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Icon from "react-native-vector-icons/Entypo";


const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerIcon={() => {
            <Icon
                name="home"
                size={20}
                color='black'
            />
        }} >
            <Drawer.Screen name="Home" component={Home} options={{
                title: 'Home',
                drawerIcon: ({ }) => (
                    <Icon
                        name="home"
                        size={20}
                        color='black'
                    />
                ),
            }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator