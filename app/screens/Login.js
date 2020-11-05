import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"

class Login extends Component {
    state = {}
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

                    />
                </View>

                <Text style={[styles.textLogin, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20}></Icon>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity>
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.props.navigation.replace('Menu', { screen: "Home" })}>
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