import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"


class Login extends Component {
    constructor() {
        super();
        this.state = {
            secureTextEntry: true,
            iconName: "eye-off",
            userID:'',
            password:'',
            nameError:'',
            passwordError:'',
        }
    }

    updateSecureTextEntry = () => {
        let iconName = (this.state.secureTextEntry) ? "eye" : "eye-off"
        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

     validateForm = () => {
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
 */
        //if(flagUser && flagPsw) {
            global.userType=this.state.userID.trim();
            global.user='XX';
            this.props.navigation.navigate("Menu", { screen: "Home", params: { user: 'XX', userType: 'UT' } })
        //}
      } 

    render() {
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
                        secureTextEntry={this.state.secureTextEntry}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({password:text})}
                        value={this.state.password}
                    />

                    <TouchableOpacity onPress={this.updateSecureTextEntry}>
                        <Feather
                            name={this.state.iconName}
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                 <Text style={{color: 'red'}}>{this.state.passwordError}</Text> 

                <View style={styles.button}>
                    <TouchableOpacity style={styles.appButtonContainer} onPress={this.validateForm} >
                        <Text style={styles.appButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Login;


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