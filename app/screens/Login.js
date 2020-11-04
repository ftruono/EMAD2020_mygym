import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"


const initialState = {
    userid: "",
    password: "",
    useridError: "",
    passwordError: ""
  };

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userid: '',
            password:'',
            useridError:'',
            passwordError:'',
            secureTextEntry: true,
            iconName: "eye-off",
        }
      }

    updateSecureTextEntry = () => {
        let iconName = (this.state.secureTextEntry) ? "eye" : "eye-off"
        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

    checkFormValid = () => {
        let useridError = "";
        let passwordError = "";
        // let passwordError = "";
    
        if (!this.state.userid) {
          nameError = "UserID non può essere vuoto";
        }
    
        if (!this.state.password) {
          emailError = "Invalid Password";
        }
    
        if (useridError || passwordError) {
          this.setState({ useridError, passwordError });
          return false;
        }
    
        return true;
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.checkFormValid();
        if (isValid) {
          this.setState(initialState);
        }
      };
    render() {
        return (
            <View style= {styles.container}>
               <Text style = {styles.textLogin}>UserID</Text>
               <View style={styles.action}>
                    <Icon name="user-o" color="#05375a" size={20}></Icon>                      
                    <TextInput
                        placeholder="UserID"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"

                    />
                </View>

                <Text style = {[styles.textLogin,{marginTop:35}]}>Password</Text>
                    <View style={styles.action}>
                        <Icon name="lock" color="#05375a" size={20}></Icon>                                        
                        <TextInput 
                            placeholder="Password"
                            secureTextEntry={this.state.secureTextEntry}
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                                                            
                        <TouchableOpacity onPress={this.updateSecureTextEntry}> 
                            <Feather 
                                name= {this.state.iconName}
                                color="grey"
                                size={20}
                            />         
                        </TouchableOpacity>
                    </View>
                
                <View style={styles.button}>
                    <TouchableOpacity style={styles.appButtonContainer} >
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