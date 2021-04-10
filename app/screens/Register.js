import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../config/AutenticationConfig';
import * as DocumentPicker from 'expo-document-picker';
import { FirebaseAutentication } from '../config/FirebaseConfig';
import { HelperText } from 'react-native-paper';
import sendEmail, {Email} from 'react-native-email';




export default function Register(props) {

    const MANDATORY_FIELD = "Campo Obbligatorio";
    const EMAIL_ERROR = "Email non presente oppure invalida"
    const CATEGORY_ERROR = "Inserisci una categoria corretta"

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPsw, setConfirmPsw] = useState('');
    const [equalPswError, setEqualPswError] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [tipo, setTipoUser] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconNamePass, setIconNamePass] = useState("eye-off");
    const [iconName, setIconName] = useState("eye-off");
    const [fileContentDocument, setfileContentDocument] = useState('');
    const [fileContentCertificate, setfileContentCertificate] = useState('');
    const [fileNameDocument, setfileNameDocument] = useState('');
    const [fileNameCertificate, setfileNameCertificate] = useState('');


    function updateSecureTextEntryPass() {
        setSecureTextEntryPass(!secureTextEntryPass);
        setIconNamePass((secureTextEntryPass) ? "eye" : "eye-off");
        
    }

    function updateSecureTextEntry() {
        setSecureTextEntry(!secureTextEntry);
        setIconName((secureTextEntry) ? "eye" : "eye-off");
        
    }

    const validateFormUser = () => {
        var validate = true;
        setUsernameError('')
        setEmailError('');
        setPasswordError('');
        setEqualPswError('');


        if (username.length == 0) {
            validate = false;
            setEmailError(MANDATORY_FIELD);
        }

        if (email.length == 0 && !email.includes('@')) {
            validate = false;
            setEmailError(EMAIL_ERROR);
        }

        if (password.length < 6) {
            validate = false;
            setPasswordError(MANDATORY_FIELD);
        }

        if (confirmPsw != password) {
            validate = false;
            setEqualPswError("Le password non coincidono")
        }

        return validate;

    }

    function cleanFormUser() {
        setUsername('')
        setEmail('');
        setPassword('');
        setConfirmPsw('');
    }

    function cleanFormPT() {
        cleanFormUser();
        setTipoUser('');
    }

    async function register() {
        try {
            await FirebaseAutentication.createUserWithEmailAndPassword(email, password);
        } catch (e) {
            alert("Register Failed")
        }

    }


    const validateFormPT = () => {
        var validate = true;
        setUsernameError('')
        setTipoError('');
        setEmailError('');
        setPasswordError('');
        setEqualPswError('');


        if (username.length == 0) {
            validate = false;
            setEmailError(MANDATORY_FIELD);
        }

        if (email.length == 0 && !email.includes('@')) {
            validate = false;
            setEmailError(EMAIL_ERROR);
        }

        if (password.length < 6) {
            validate = false;
            setPasswordError(MANDATORY_FIELD);
        }

        if (confirmPsw != password) {
            validate = false;
            setEqualPswError("Le password non coincidono")
        }

        if (tipo.length == 0) {
            validate = false;
            setTipoError(MANDATORY_FIELD);
        }

        if(tipo !== 'Nutrizionista' && tipo !== 'Personal Trainer') {
            validate = false;
            setTipoError(CATEGORY_ERROR);
        }

        return validate;
    }


    function getUploadFile(type) {
        if (type == "DOC") {
            setfileContentDocument('');
            setfileNameDocument('');
        } else {
            setfileContentCertificate('');
            setfileNameCertificate('');
        }

        DocumentPicker.getDocumentAsync({ type: "application/pdf" }).then(
            (value) => {
                if (value.type == "success") {
                    if (type == "DOC") {
                        setfileNameDocument(value.name);
                        setfileContentDocument(value.uri);
                    } else {
                        setfileNameCertificate(value.name);
                        setfileContentCertificate(value.uri);
                    }
                    console.log(value.uri);
                }


            }
        );


    }

    const handleEmail = () => {
      const to = ['liguorinovincenzo0@gmail.com'] // string or array of email addresses
        sendEmail(to, {
            //cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            
            subject: 'Certificati/Documenti per My Gym',
            body: 'Ciao sono  ' + email + ' questi sono i miei documenti. Saluti'

        }).catch(console.error)
    }

    function renderSelectedForm(param) {
        switch (param) {
            case 'No':
                return (
                    <View name="form_user">
                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]}                     
                        onPress={() => {
                                if (validateFormUser()) {
                                    alert("Puoi fare la registrazione")
                                    cleanFormUser()
                                    register()
                                }
                            }}>
                                <Text style={styles.appButtonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>);
            case 'Si':
                return (
                    <View name="form_pt">
                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Tipo di utente:</Text>
                        <View style={styles.action}>
                        <Feather name="user" color="#05375a" size={20}></Feather>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Tipo utente'
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={setTipoUser}
                                value={tipo}
                            />
                        </View>

                        <Text style={{ color: 'red' }}>{tipoError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Per completare la registrazione inviaci i tuoi certificati e il tuo documento d'identità</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={() => handleEmail()}>
                            <Feather name="mail" color="#05375a" size={40}></Feather>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]}
                            onPress={() => {
                                if (validateFormPT()) {
                                    cleanFormPT()
                                    register()
                                }
                            }}>
                            <Text style={styles.appButtonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>);
            default:
                return null;
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.textLogin}>Username</Text>
                <View style={styles.action}>
                    <Feather name="user" color="#05375a" size={20}></Feather>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>

                <Text style={{ color: 'red' }}>{usernameError}</Text>

                <Text style={styles.textLogin}>E-mail</Text>
                <View style={styles.action}>
                    <Feather name="mail" color="#05375a" size={20}></Feather>
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                <Text style={{ color: 'red' }}>{emailError}</Text>


                <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20}></Icon>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={secureTextEntryPass}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        value={password}
                    />

                        <TouchableOpacity onPress={() => { updateSecureTextEntryPass() }}>
                        <Feather
                            name={iconNamePass}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'red' }}>{passwordError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Conferma Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20}></Icon>
                    <TextInput
                        placeholder="Conferma Password"
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setConfirmPsw}
                        value={confirmPsw}
                    />

                        <TouchableOpacity onPress={() => { updateSecureTextEntry() }}>
                        <Feather
                            name={iconName}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'red' }}>{equalPswError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Sei un Nutrizionista o Personal Trainer?</Text>
                <DropDownPicker
                    items={[
                        { label: 'Si', value: 'Si' },
                        { label: 'No', value: 'No' }
                    ]}
                    defaultValue={selectedValue}
                    placeholder="Scegli..."
                    containerStyle={{ height: 60, width: 150 }}
                    style={{ backgroundColor: '#fafafa', marginTop: 10 }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => setSelectedValue(item.value)}
                />

                {renderSelectedForm(selectedValue)}

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingBottom: 150
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
        fontWeight: "bold",
        marginTop: 15
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