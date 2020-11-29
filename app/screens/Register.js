import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import Fontisto from "react-native-vector-icons/Fontisto"
import DropDownPicker from 'react-native-dropdown-picker';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            secureTextEntryPass: true,
            iconNamePass: "eye-off",
            secureTextEntry: true,
            iconName: "eye-off",
            selectedValue:'',
            email:'',
            userID:'',
            password:'',
            regione:'',
            provincia:'',
            citta:'',
            categoria:'',
            nameError:'',
            emailError:'',
            passwordError:'',
            equalPswError:'',
            regioneError:'',
            provinciaError:'',
            cittaError:'',
            categoriaError:'',
            typeAbbonamento:''
           }
           this.handleChange = this.handleChange.bind(this);
      }

      updateSecureTextEntryPass = () => {
        let iconNamePass = (this.state.secureTextEntryPass) ? "eye" : "eye-off"
        this.setState({
            secureTextEntryPass: !this.state.secureTextEntryPass,
            iconNamePass: iconNamePass
        });
    }

    updateSecureTextEntry = () => {
        let iconName = (this.state.secureTextEntry) ? "eye" : "eye-off"
        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

    validateFormUser = () => {
        if (this.state.email.trim() === "" ) {
            this.setState(() => ({ emailError: "Campo obbligatorio."}));
        } else{
            this.setState(() => ({ emailError: ""}));
        }
        if (this.state.userID.trim() === "") {
            this.setState(() => ({ nameError: "Campo obbligatorio."}));
        } else{
            this.setState(() => ({ nameError: ""}));
        }

        if(this.state.password.length < 8) {
            this.setState(() => ({ passwordError: "La password deve essere almeno di 8 caratteri"}))
        } else{
            this.setState(() => ({ passwordError: ""}));
        }

        if(this.state.confirmPsw != this.state.password) {
            this.setState(() => ({ equalPswError: "Le password non sono uguali"}))
        } else{
            this.setState(() => ({ equalPswError: ""}));
        }
      }

      validateFormPT = () => {
        if (this.state.regione.trim() === "" ) {
            this.setState(() => ({ regioneError: "Campo obbligatorio."}));
        } else{
            this.setState(() => ({ regioneError: ""}));
        }
        if (this.state.provincia.trim() === "") {
            this.setState(() => ({ provinciaError: "Campo obbligatorio."}));
        } else{
            this.setState(() => ({ provinciaError: ""}));
        }

        if(this.state.citta.trim() === "") {
            this.setState(() => ({ cittaError: "Campo obbligatorio."}))
        } else{
            this.setState(() => ({ cittaError: ""}));
        }

        if(this.state.categoria.trim() === "") {
            this.setState(() => ({ categoriaError: "Campo obbligatorio."}))
        } else{
            this.setState(() => ({ categoriaError: ""}));
        }
      }

      renderSelectedForm(param) {
        switch(param) {
          case 'form_user':
            return (
                <View name="form_user">
                <Text style = {[styles.textLogin,{marginTop:35}]}>Piano Abbonamento</Text>
                <DropDownPicker
                    items={[
                            {label: 'Piano Standard', value: "standard"},
                            {label: 'Piano Premium', value: 'premium'},
                            {label: 'Piano con Live', value: 'live'},
                    ]}
                    defaultValue={this.state.typeAbbonamento}
                    placeholder="Scegli l'abbonamento"
                    containerStyle={{height: 60,width:200}}
                    style={{backgroundColor: '#fafafa',marginTop:10}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        typeAbbonamento: item.value
                    })}
                />
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.appButtonContainer} onPress={this.validateFormUser}>
                                <Text style={styles.appButtonText}>Registrati</Text>
                            </TouchableOpacity>
                        </View>

                    </View>);
            case 'form_pt':
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
                                onChangeText={(text) => this.setState({regione:text})}
                                value={this.state.regione}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.regioneError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Provincia</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Provincia'
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({provincia:text})}
                                value={this.state.provincia}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.provinciaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Città</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Città"
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({citta:text})}
                                value={this.state.citta}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.cittaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Categoria</Text>
                        <View style={styles.action}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Categoria"
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({categoria:text})}
                                value={this.state.categoria}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.categoriaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo certificato</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}>
                            <Entypo name="attachment" color="grey" size={30}></Entypo>
                        </TouchableOpacity>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo documento d'identità</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}>
                            <Entypo name="attachment" color="grey" size={30}></Entypo>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]} onPress={this.validateFormPT}>
                            <Text style={styles.appButtonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>);
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
                                onChangeText={(text) => this.setState({regione:text})}
                                value={this.state.regione}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.regioneError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Provincia</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Provincia'
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({provincia:text})}
                                value={this.state.provincia}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.provinciaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Città</Text>
                        <View style={styles.action}>
                            <Fontisto name="world" color="#05375a" size={20}></Fontisto>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Città"
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({citta:text})}
                                value={this.state.citta}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.cittaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Categoria</Text>
                        <View style={styles.action}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Categoria"
                                autoCapitalize="none"
                                placeholderTextColor="#666666"
                                onChangeText={(text) => this.setState({categoria:text})}
                                value={this.state.categoria}
                            />
                        </View>

                        <Text style={{color: 'red'}}>{this.state.categoriaError}</Text>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo certificato</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}>
                            <Entypo name="attachment" color="grey" size={30}></Entypo>
                        </TouchableOpacity>

                        <Text style={[styles.textLogin, { marginTop: 35 }]}>Allega il tuo documento d'identità</Text>
                        <TouchableOpacity style={{ marginTop: 15 }}>
                            <Entypo name="attachment" color="grey" size={30}></Entypo>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.appButtonContainer, { marginTop: 50, width: 200 }]} onPress={this.validateFormPT}>
                            <Text style={styles.appButtonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>);
            default:
                return null;
        }
    }
    handleChange(event) { this.setState({ selectedValue: event.target.onChangeItem }); }
    render() {
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
                            onChangeText={(text) => this.setState({email:text})}
                            value={this.state.email}
                        />
                    </View>

                    <Text style={{color: 'red'}}>{this.state.emailError}</Text>
                    
                    <Text style={[styles.textLogin, { marginTop: 35 }]}>UserID</Text>
                    <View style={styles.action}>
                        <Icon name="user-o" color="#05375a" size={20}></Icon>
                        <TextInput
                            placeholder="UserID"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({userID:text})}
                            value={this.state.userID}
                        />
                    </View>

                    <Text style={{color: 'red'}}>{this.state.nameError}</Text>
                    
                    <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Icon name="lock" color="#05375a" size={20}></Icon>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={this.state.secureTextEntryPass}
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({password:text})}
                            value={this.state.password}
                        />

                        <TouchableOpacity onPress={this.updateSecureTextEntryPass}>
                            <Feather 
                                name={this.state.iconNamePass}
                                color="grey"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={{color: 'red'}}>{this.state.passwordError}</Text>

                    <Text style={[styles.textLogin, { marginTop: 35 }]}>Conferma Password</Text>
                    <View style={styles.action}>
                        <Icon name="lock" color="#05375a" size={20}></Icon>
                        <TextInput
                            placeholder="Conferma Password"
                            secureTextEntry={this.state.secureTextEntry}
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({confirmPsw:text})}
                            value={this.state.confirmPsw}
                        />
                                                            
                        <TouchableOpacity onPress={this.updateSecureTextEntry}>
                            <Feather 
                                name={this.state.iconName}
                                color="grey"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={{color: 'red'}}>{this.state.equalPswError}</Text>

                    <Text style={[styles.textLogin, { marginTop: 35 }]}>Che tipo di utente sei?</Text>
                            <DropDownPicker
                                items={[
                                    {label: 'Utente semplice', value: "form_user"},
                                    {label: 'Personal Trainer', value: 'form_pt'},
                                    {label: 'Nutrizionista', value: 'form_nutri'},
                                ]}
                                defaultValue={this.state.selectedValue}
                                placeholder="Scegli il tipo"
                                containerStyle={{height: 60,width:150}}
                                style={{backgroundColor: '#fafafa',marginTop:10}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    selectedValue: item.value
                                })}
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
        paddingBottom:150
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
        marginTop:15
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