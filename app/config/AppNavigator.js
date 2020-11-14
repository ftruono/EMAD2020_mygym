import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Entypo";
import HomeUser from "../screens/user/HomeUser";
import HomeNT from "../screens/nutritionist/HomeNT";
import HomePT from "../screens/personaltrainer/HomePT";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import LiveCalendar from "../screens/LiveCalendar";
import DatiPersonaliUser from "../screens/user/DatiPersonaliUser"

import CreateWorkout from "../screens/personaltrainer/createWorkout";
import Dieta from "../screens/nutritionist/Dieta";

const Drawer = createDrawerNavigator();

const DrawerContent = ({ progress, ...props }) => (

    <SafeAreaView style={styles.menu}>
        <Image
            source={ require("../../assets/favicon.png")}
            style={styles.sideMenuProfileIcon}
        />
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    menu: {
        flex: 1,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
      }

});


const DrawerNavigator = () => {

    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            {global.userType == 'UT' ? (
                <>
                    <Drawer.Screen name="Home" component={HomeUser} options={{
                        title: 'Home',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Dati_Personali" component={DatiPersonaliUser} options={{
                        title: 'Dati Personali',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),

                    }} />
                    <Drawer.Screen name="Dieta" component={Dieta} options={{
                        title: 'Dieta',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Statistiche" component={HomeUser} options={{
                        title: 'Statistiche',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Calendario" component={LiveCalendar} options={{
                        title: 'Calendario Live',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Cambio PT" component={HomeUser} options={{
                        title: 'Cambio PT',
                        drawerIcon: ({ }) => (
                            <Icon
                                name="home"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                </>) : (global.userType == 'NT' ? (
                    <>
                        <Drawer.Screen name="Home" component={HomeNT} options={{
                            title: 'Home',
                            drawerIcon: ({ }) => (
                                <Icon
                                    name="home"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Piani" component={HomeNT} options={{
                            title: 'Piani Alimentari',
                            drawerIcon: ({ }) => (
                                <Icon
                                    name="home"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Dati_Personali" component={HomeNT} options={{
                            title: 'Dati Personali',
                            drawerIcon: ({ }) => (
                                <Icon
                                    name="home"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Vedi_Clienti" component={HomeNT} options={{
                            title: 'Vedi Clienti',
                            drawerIcon: ({ }) => (
                                <Icon
                                    name="home"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                    </>
                ) : (
                        <>
                            <Drawer.Screen name="Home" component={HomePT} options={{
                                title: 'Home',
                                drawerIcon: ({ }) => (
                                    <Icon
                                        name="home"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />
                            <Drawer.Screen name="Scheda_Allenamento" component={CreateWorkout} options={{
                                title: 'Scheda Allenamento',
                                drawerIcon: ({ }) => (
                                    <Icon
                                        name="home"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />
                            <Drawer.Screen name="Vedi Clienti" component={HomePT} options={{
                                title: 'Vedi Clienti',
                                drawerIcon: ({ }) => (
                                    <Icon
                                        name="home"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />
                            <Drawer.Screen name="Calendario_Live" component={LiveCalendar} options={{
                                title: 'Calendario Live',
                                drawerIcon: ({ }) => (
                                    <Icon
                                        name="home"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />


                        </>
                    )



                )}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator