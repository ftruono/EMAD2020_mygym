import React, { Component, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { AuthContext } from '../config/AutenticationConfig';
import { FirebaseAutentication } from '../config/FirebaseConfig';





export const Login = () => {


    
    

    const [iconName, setIconName] = React.useState("eye-off");
    const [username, setUsername] = React.useState("fra@fra.it");
    const [password, setPassword] = React.useState("frafra");
    const [secureTextEntry, setSecureTextEntry] = React.useState(false)
    const [nameErrror, setNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');


    function updateSecureTextEntry() {
        console.log("called"); 
        setSecureTextEntry(!secureTextEntry);
        setIconName((secureTextEntry) ? "eye" : "eye-off");

    }

    const validateForm = () => {
        var preValidation = true;
        var login = true;
        setLoginError('');
        if (username.length == 0) {
            preValidation = false;
            setNameError("Il campo non può essere vuoto");
        } else {
            setNameError('');
        }

        if (password.length < 6) {
            preValidation = false;
            setPasswordError('La password ha una lunghezza minimo di 6 caratteri');
        } else {
            setPasswordError('');
        }

        if (preValidation) {
            tryLogin(login);
        }
        return (login && preValidation);
    }


    async function tryLogin(login) {
        try {
            await FirebaseAutentication.signInWithEmailAndPassword(username, password);
            login = true;
        } catch (e) {
            login = false;
            console.log(e.code);
            getErrorByCode(e.code);
        }

    }

    function getErrorByCode(code) {
        if (code == 'auth/wrong-password') {
            setLoginError('Password o username non valido');
        }else if(code== 'auth/user-not-found' || code=='auth/invalid-email'){
            setLoginError('Utente non presente, verificare i dati inseriti');
        }else if(code== 'auth/network-request-failed'){
            setLoginError('Connessione non rilevata, verifica la connessione di rete');
        }
    }


    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo1.png")}
                style={styles.sideMenuProfileIcon}
            />
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

            <Text style={styles.error}>{nameErrror}</Text>

            <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
            <View style={styles.action}>
                <Icon name="lock" color="#05375a" size={20}></Icon>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity onPress={() => { updateSecureTextEntry() }}>
                    <Feather
                        name={iconName}
                        color="grey"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.error}>{passwordError}</Text>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.appButtonContainer}
                    onPress={() => {
                        if (validateForm()) {
                            signIn({ username, password })
                        }
                    }
                    } >
                    <Text style={styles.appButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.errorLogin}>{loginError}</Text>


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
    },
    error: {
     color:'red',
    },
    errorLogin:{
      color:'red',
      textAlign:'center',
      fontSize:18,
      fontWeight:'bold',
      padding:25,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 300,
        height: 300,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    }
});