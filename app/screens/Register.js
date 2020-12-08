import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import Fontisto from "react-native-vector-icons/Fontisto"
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../config/AutenticationConfig';
import * as DocumentPicker from 'expo-document-picker';



export default function Register(props) {

    const MANDATORY_FIELD = "Campo Obbligatorio";

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPsw, setConfirmPsw] = useState('');
    const [equalPswError, setEqualPswError] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [typeAbbonamento, setTypeAbbonamento] = useState('');
    const [regione, setRegione] = useState('');
    const [regioneError, setRegioneError] = useState('');
    const [provincia, setProvincia] = useState('');
    const [provinciaError, setProvinciaError] = useState('');
    const [citta, setCitta] = useState('');
    const [cittaError, setCittaError] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categoriaError, setCategoriaError] = useState('');
    const [secureTextEntryPass, setSecureTextEntryPass] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [iconNamePass, setIconNamePass] = useState("eye-off");
    const [iconName, setIconName] = useState("eye-off");
    const [fileContentDocument, setfileContentDocument] = useState('');
    const [fileContentCertificate, setfileContentCertificate] = useState('');
    const [fileNameDocument, setfileNameDocument] = useState('');
    const [fileNameCertificate, setfileNameCertificate] = useState('');







    function updateSecureTextEntryPass() {
        setIconNamePass((secureTextEntryPass) ? "eye" : "eye-off");
        setSecureTextEntryPass(!secureTextEntryPass);
    }

    function updateSecureTextEntry() {
        setIconName((secureTextEntry) ? "eye" : "eye-off");
        setSecureTextEntry(!secureTextEntry);
    }

    function validateFormUser() {
        setEmailError('');
        setPasswordError('');
        setEqualPswError('');


        if (email.length == 0) {
            setEmailError(MANDATORY_FIELD);
        }

        if (password.length < 6) {
            setPasswordError(MANDATORY_FIELD);
        }

        if (confirmPsw != password) {
            setEqualPswError("Le password non coincidono")
        }

    }


    function validateFormPT() {
        setRegioneError('');
        setProvinciaError('');
        setCategoriaError('');
        setCittaError('');


        if (regione.length == 0) {
            setRegioneError(MANDATORY_FIELD);
        }

        if (provincia.length == 0) {
            setProvinciaError(MANDATORY_FIELD);
        }

        if (citta.length == 0) {
            setCittaError(MANDATORY_FIELD);
        }

        if (categoria.length == 0) {
            setCategoriaError(MANDATORY_FIELD);
        }
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


    function renderSelectedForm(param) {
        switch (param) {
            case 'form_user':
                return (
                    <View name="form_user">
                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Piano Abbonamento</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Piano Standard', value: "standard" },
                                { label: 'Piano Premium', value: 'premium' },
                                { label: 'Piano con Live', value: 'live' },
                            ]}
                            placeholder="Scegli l'abbonamento"
                            defaultValue={typeAbbonamento}
                            containerStyle={{ height: 60, width: 200 }}
                            style={{ backgroundColor: '#fafafa', marginTop: 10 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setTypeAbbonamento(item.value)}
                        />
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.appButtonContainer} onPress={validateFormUser}>
                                <Text style={styles.appButtonText}>Registrati</Text>
                            </TouchableOpacity>
                        </View>

                    </View>);
            case 'form_pt':
            case 'form_nutri':
                return (
                    <View name="form_pt">
                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Regione</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Regione'
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={setRegione}
                                value={regione}
                            />
                        </View>

                        <Text style={{ color: 'red' }}>{regioneError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Provincia</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Provincia'
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={setProvincia}
                                value={provincia}
                            />
                        </View>

                        <Text style={{ color: 'red' }}>{provinciaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Città</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Città"
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={setCitta}
                                value={citta}
                            />
                        </View>

                        <Text style={{ color: 'red' }}>{cittaError}</Text>

                        {param == 'form_pt' ?
                            <View>
                                <Text style={[styles.textLogin, { marginTop: 35 }]}>Categoria</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Categoria"
                                        autoCapitalize="none"
                                        placeholderTextColor="#666666"
                                        onChangeText={setCategoria}
                                        value={categoria}
                                    />
                                </View>
                            </View> : null}
                        <Text style={{ color: 'red' }}>{categoriaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo certificato</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={() => getUploadFile("CER")}>
                            <Entypo name="attachment" color="grey" size={30}><Text style={{ fontSize: 16, marginLeft: 5 }}>{fileNameCertificate}</Text></Entypo>
                        </TouchableOpacity>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo documento d'identità</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={() => getUploadFile("DOC")} >
                            <Entypo name="attachment" color="grey" size={30}><Text style={{ fontSize: 16, marginLeft: 5 }}>{fileNameDocument}</Text></Entypo>

                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]}
                            onPress={validateFormPT}>
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
                        secureTextEntry={setSecureTextEntryPass}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        value={password}
                    />

                    <TouchableOpacity onPress={updateSecureTextEntryPass}>
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

                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <Feather
                            name={iconName}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'red' }}>{equalPswError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Che tipo di utente sei?</Text>
                <DropDownPicker
                    items={[
                        { label: 'Utente semplice', value: "form_user" },
                        { label: 'Personal Trainer', value: 'form_pt' },
                        { label: 'Nutrizionista', value: 'form_nutri' },
                    ]}
                    defaultValue={selectedValue}
                    placeholder="Scegli il tipo"
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