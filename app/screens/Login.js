import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { AuthContext } from '../config/AutenticationConfig';







export function Login(props) {

    const state = {
        secureTextEntry: true,
        iconName: "eye-off",
        userID: '',
        password: '',
        nameError: '',
        passwordError: '',
    }

   const updateSecureTextEntry = () => {
        let iconName = (state.secureTextEntry) ? "eye" : "eye-off"
        state.secureTextEntry=!state.secureTextEntry;
        state.iconName=iconName;
        
    }

    const validateForm = () => {
        /* var flagUser = false;
        var flagPsw = false;
        if (this.state.userID.trim() === "") {
            this.setState(() => ({ nameError: "Il campo non può essere vuoto"}));
        } else {
            flagUser=true;
            this.setState(() => ({ nameError: ""}));
        }
    
        if(this.state.password.length < 8) {
            this.setState(() => ({ passwordError: "Il campo deve avere più di 8 caratteri"}))
        } else {
            flagPsw=true;
            this.setState(() => ({ passwordError: ""}));
        }
    
        //if(flagUser && flagPsw) {
        global.userType = this.state.userID.trim();
        global.user = 'XX';
        props.navigation.navigate("Menu", { screen: "Home", params: { user: 'XX', userType: 'UT' } })
        //}
        */
    }

    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);


    return (
        <View style={styles.container}>
            <Text style={styles.textLogin}>UserID</Text>
            <View style={styles.action}>
                <Icon name="user-o" color="#05375a" size={20}></Icon>
                <TextInput
                    placeholder="UserID"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                    value={username}
                />
            </View>

            <Text style={{ color: 'red' }}>{state.nameError}</Text>

            <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
            <View style={styles.action}>
                <Icon name="lock" color="#05375a" size={20}></Icon>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={state.secureTextEntry}
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity onPress={updateSecureTextEntry()}>
                    <Feather
                        name={state.iconName}
                        color="grey"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            <Text style={{ color: 'red' }}>{state.passwordError}</Text>

            <View style={styles.button}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() =>signIn({username,password}) } >
                    <Text style={styles.appButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
    },
    textLogin: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: "bold"
    },
    textInput: {
        flex: 1,
        marginTop: 4,
        paddingLeft: 15,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});