import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Entypo";
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import HomeUser from "../screens/user/HomeUser";
import HomeNT from "../screens/nutritionist/HomeNT";
import HomePT from "../screens/personaltrainer/HomePT";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import LiveCalendar from "../screens/personaltrainer/LiveCalendar";
import DatiPersonaliUser from "../screens/user/DatiPersonaliUser"
import ViewSingleDay from '../screens/user/ViewSingleDay'
import IniziaAllenamento from '../screens/user/IniziaAllenamento'

import CreateWorkout from "../screens/personaltrainer/CreateWorkout";
import Dieta from "../screens/nutritionist/Dieta";
import { AuthContext } from "./AutenticationConfig";

const Drawer = createDrawerNavigator();

const hideScreen = ["ViewSingleDay", "IniziaAllenamento"]

const DrawerContent = ({ progress, ...props }) => {

    const { signOut } = React.useContext(AuthContext);
    const filteredProps = {
        ...props,
        state: {
            routes: props.state.routes.filter(route => !hideScreen.includes(route.name)),
            routeNames: props.state.routeNames.filter(routeName => !hideScreen.includes(routeName))
        }
    }
    return (< SafeAreaView style={styles.menu} >
        <Image
            source={require("../../assets/favicon.png")}
            style={styles.sideMenuProfileIcon}
        />
        <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
            <DrawerItem
                label="Sign out"
                onPress={() => signOut()}
                icon={({ }) =>
                    <Octicons
                        name="sign-out"
                        size={20}
                        color='black' />
                }
            />


        </DrawerContentScrollView>
    </SafeAreaView >);
};




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


const DrawerNavigator = ({ navigation, route }) => {




    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            {route.params.user.type == 'UT' ? (
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
                            <Octicons
                                name="person"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Dieta" component={Dieta} options={{
                        title: 'Dieta',
                        drawerIcon: ({ }) => (
                            <FontAwesome
                                name="newspaper-o"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Statistiche" component={HomeUser} options={{
                        title: 'Statistiche',
                        drawerIcon: ({ }) => (
                            <Octicons
                                name="graph"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Calendario" component={LiveCalendar} options={{
                        title: 'Calendario Live',
                        drawerIcon: ({ }) => (
                            <FontAwesome
                                name="calendar"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="Cambio PT" component={HomeUser} options={{
                        title: 'Cambio PT',
                        drawerIcon: ({ }) => (
                            <FontAwesome
                                name="exchange"
                                size={20}
                                color='black'
                            />
                        ),
                    }} />
                    <Drawer.Screen name="ViewSingleDay" component={ViewSingleDay} options={{
                        drawerLabel: () => null, title: null,
                        drawerIcon: () => null
                    }} />
                    <Drawer.Screen name="IniziaAllenamento" component={IniziaAllenamento} options={{
                        drawerLabel: () => null, title: null,
                        drawerIcon: () => null
                    }} />
                </>) : (route.params.user.type == 'NT' ? (
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
                                <Entypo
                                    name="news"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Dati_Personali" component={HomeNT} options={{
                            title: 'Dati Personali',
                            drawerIcon: ({ }) => (
                                <Octicons
                                    name="person"
                                    size={20}
                                    color='black'
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Vedi_Clienti" component={HomeNT} options={{
                            title: 'Vedi Clienti',
                            drawerIcon: ({ }) => (
                                <MaterialIcons
                                    name="person-search"
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
                                    <Entypo
                                        name="news"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />
                            <Drawer.Screen name="Vedi Clienti" component={HomePT} options={{
                                title: 'Vedi Clienti',
                                drawerIcon: ({ }) => (
                                    <MaterialIcons
                                        name="person-search"
                                        size={20}
                                        color='black'
                                    />
                                ),
                            }} />
                            <Drawer.Screen name="Calendario_Live" component={LiveCalendar} options={{
                                title: 'Calendario Live',
                                drawerIcon: ({ }) => (
                                    <FontAwesome
                                        name="calendar"
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