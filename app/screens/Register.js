import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import DropDownPicker from 'react-native-dropdown-picker';
import { FirebaseAutentication, Firestore } from '../config/FirebaseConfig';
import sendEmail from 'react-native-email';



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.getUsernameAndEmail()
    }
    state = {
        
        MANDATORY_FIELD: 'Campo Obbligatorio',
        EMAIL_ERROR: 'Email non presente oppure invalida',
        CATEGORY_ERROR: 'Inserisci una categoria corretta',
        DUPLICATED_USERNAME_ERROR: 'Username duplicato, questo indicato esiste già',
        DUPLICATED_EMAIL_ERROR: 'Email già presente, sceglierne un altra',
        arrayUsername: [],
        arrayEmail: [],
        username:'',
        usernameError:'',
        email:'',
        emailError:'',
        password:'',
        passwordError:'',
        confirmPsw:'',
        equalPswError:'',
        selectedValue:'',
        tipo:'',
        tipoError:'',
        secureTextEntry: true,
        secureTextEntryPass: true,
        iconNamePass:'eye-off',
        iconName:'eye-off',
    }
    

    updateSecureTextEntryPass() {
        this.setState({secureTextEntryPass: !this.state.secureTextEntryPass})
        this.setState({iconNamePass: this.state.secureTextEntryPass ? 'eye' : 'eye-off'})
    }

    updateSecureTextEntry() {
        this.setState({secureTextEntry: !this.state.secureTextEntry})
        this.setState({iconNamePass: this.statesecureTextEntry ? 'eye' : 'eye-off'})
    }

    getUsernameAndEmail = async () => {

        var idDocument = [];
        const user = await Firestore.collection('UTENTI').get()
        for(let i = 0; i<user.docs.length; i++) {
            idDocument.push(user.docs[i].id)
        }

        var usernameArray= [];
        var emailArray= [];
        for(let j = 0; j< idDocument.length; j++ ) {
            const user = (await Firestore.collection('UTENTI').doc(idDocument[j]).get()).data();
            if(user.username != undefined) {
                usernameArray.push(user.username);
            }
            if(user.email != undefined) {
                emailArray.push(user.email);
            }
        }

        this.setState({arrayUsername:usernameArray})
        this.setState({arrayEmail:emailArray})

        console.log(this.state.arrayUsername)
        console.log(this.state.arrayEmail)
    }

    validateFormUser = () => {
        var validate = true;
        this.setState({usernameError:''})
        this.setState({emailError:''})
        this.setState({passwordError:''})
        this.setState({equalPswError:''})



        if (this.state.username.length == 0) {
            validate = false;
            this.setState({usernameError: this.state.MANDATORY_FIELD})
        }

        if(this.state.arrayUsername.includes(this.state.username)) {
            validate = false;
            this.setState({usernameError: this.state.DUPLICATED_USERNAME_ERROR})
        }

        if (this.state.email.length == 0 && !this.state.email.includes('@')) {
            validate = false;
            this.setState({emailError:this.state.EMAIL_ERROR})
        }

        if(this.state.arrayEmail.includes(this.state.email)) {
            validate = false
            this.setState({emailError:this.state.DUPLICATED_EMAIL_ERROR})
        }

        if (this.state.password.length < 6) {
            validate = false;
            this.setState({passwordError:this.state.MANDATORY_FIELD})
        }

        if (this.state.confirmPsw != this.state.password) {
            validate = false;
            this.setState({equalPswError: 'Le password non coincidono'})
        }

        return validate;

    }

    cleanFormUser() {
        this.setState({username:''})
        this.setState({email:''})
        this.setState({password:''})
        this.setState({confirmPsw:''})
    }

    cleanFormPT() {
        this.cleanFormUser();
        this.setState({tipo:''})
        this.getUsernameAndEmail()
    }

    register = async () => {
        console.log(this.state.tipo)
        console.log(this.state.username)
        var usernameUser = this.state.username
        console.log(this.state.password)
        var emailUser = this.state.email
        console.log(this.state.email)
        var typeUser = '';

        if(this.state.tipo === 'Personal Trainer') {
            typeUser = 'PT'
        } else {
            if(this.state.tipo === 'Nutrizionista') {
                typeUser = 'NT'
            } else {
                typeUser = 'UT'
            }
        }

        

        console.log(typeUser)

        try {

            await FirebaseAutentication.createUserWithEmailAndPassword(this.state.email, this.state.password);
            
            var userRef = FirebaseAutentication.currentUser.uid


            if(typeUser == 'NT' || typeUser == 'PT') {

                console.log(usernameUser)
                console.log('Appuntamenti e clienti' + typeUser)
                console.log(emailUser)

                Firestore.collection(
                    'UTENTI'
                ).doc(
                    userRef
                ).set({
                    type: typeUser,
                    username: usernameUser,
                    appuntamenti:[],
                    clienti:[],
                    email: emailUser
                });

            } else {

                console.log(usernameUser)
                console.log('Schede, Misure e Diete' + typeUser)
                console.log(emailUser)

                Firestore.collection(
                    'UTENTI'
                ).doc(
                    userRef
                ).set({
                    type: typeUser,
                    username: usernameUser,
                    email: emailUser,
                    misure:[],
                    schede:[],
                    diete:[]
                });

            }
            
        } catch (e) {
            console.log(e)
            alert("Register Failed")
        }
    }

    validateFormPT = () => {
        var validate = true;
        this.setState({usernameError:''})
        this.setState({emailError:''})
        this.setState({passwordError:''})
        this.setState({equalPswError:''})
        this.setState({tipoError:''})


        if (this.state.username.length == 0) {
            validate = false;
            this.setState({usernameError: this.state.MANDATORY_FIELD})
        }

        if(this.state.arrayUsername.includes(this.state.username)) {
            validate = false;
            this.setState({usernameError: this.state.DUPLICATED_USERNAME_ERROR})
        }

        if (this.state.email.length == 0 && !this.state.email.includes('@')) {
            validate = false;
            this.setState({emailError:this.state.EMAIL_ERROR})
        }

        if(this.state.arrayEmail.includes(this.state.email)) {
            validate = false
            this.setState({emailError:this.state.DUPLICATED_EMAIL_ERROR})
        }

        if (this.state.password.length < 6) {
            validate = false;
            this.setState({passwordError:this.state.MANDATORY_FIELD})
        }

        if (this.state.confirmPsw != this.state.password) {
            validate = false;
            this.setState({equalPswError: 'Le password non coincidono'})
        }

        if (this.state.tipo.length == 0) {
            validate = false;
            setTipoError(MANDATORY_FIELD);
        }

        if(this.state.tipo !== 'Nutrizionista' && this.state.tipo !== 'Personal Trainer') {
            validate = false;
            this.setState({tipoError: this.state.CATEGORY_ERROR})
        }

        return validate;
    }


    handleEmail = () => {
        const to = ['liguorinovincenzo0@gmail.com'] // string or array of email addresses
          sendEmail(to, {
              //cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
              
              subject: 'Certificati/Documenti per My Gym',
              body: 'Ciao sono  ' + this.state.email + ' questi sono i miei documenti. Saluti'
  
          }).catch(console.error)
    }

    renderSelectedForm(param) {
        switch (param) {
            case 'No':
                return (
                    <View name="form_user">
                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]}                     
                        onPress={() => {
                                if (this.validateFormUser()) {
                                    this.register()
                                    this.cleanFormUser()
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
                                onChangeText={text => {this.setState({ tipo: text })}}
                                value={this.state.tipo}
                            />
                        </View>

                        <Text style={{ color: 'red' }}>{this.state.tipoError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Per completare la registrazione inviaci i tuoi certificati e il tuo documento d'identità</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={() => this.handleEmail()}>
                            <Feather name="mail" color="#05375a" size={40}></Feather>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]}
                            onPress={() => {
                                if (this.validateFormPT()) {
                                    this.register()
                                    this.cleanFormPT()
                                }
                            }}>
                            <Text style={styles.appButtonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>);
            default:
                return null;
        }
    }
    
  

    render() {

       
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
                        onChangeText={text => {this.setState({ username: text })}}
                        value={this.state.username}
                    />
                </View>

                <Text style={{ color: 'red' }}>{this.state.usernameError}</Text>

                <Text style={styles.textLogin}>E-mail</Text>
                <View style={styles.action}>
                    <Feather name="mail" color="#05375a" size={20}></Feather>
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={text => {this.setState({ email: text })}}
                        value={this.state.email}
                    />
                </View>

                <Text style={{ color: 'red' }}>{this.state.emailError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20}></Icon>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={this.state.secureTextEntryPass}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={text => {this.setState({ password: text })}}
                        value={this.state.password}
                    />

                        <TouchableOpacity onPress={() => { this.updateSecureTextEntryPass() }}>
                        <Feather
                            name={this.state.iconNamePass}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'red' }}>{this.state.passwordError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Conferma Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20}></Icon>
                    <TextInput
                        placeholder="Conferma Password"
                        secureTextEntry={this.state.secureTextEntry}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={text => {this.setState({ confirmPsw: text })}}
                        value={this.state.confirmPsw}
                    />

                        <TouchableOpacity onPress={() => { this.updateSecureTextEntry() }}>
                        <Feather
                            name={this.state.iconName}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'red' }}>{this.state.equalPswError}</Text>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Sei un Nutrizionista o Personal Trainer?</Text>
                <DropDownPicker
                    items={[
                        { label: 'Si', value: 'Si' },
                        { label: 'No', value: 'No' }
                    ]}
                    defaultValue={this.state.selectedValue}
                    placeholder="Scegli..."
                    containerStyle={{ height: 60, width: 150 }}
                    style={{ backgroundColor: '#fafafa', marginTop: 10 }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => {this.setState({ selectedValue: item.value })}}
                />

                {this.renderSelectedForm(this.state.selectedValue)}

            </View>
        </ScrollView>
        );
    }
}

export default Register;


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