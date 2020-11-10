import React, {Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Modal} from 'react-native';
import Calendar from "react-native-customize-selected-date"
import Icon from "react-native-vector-icons/FontAwesome"
import _ from "lodash"
import ModalEvent from '../component/ModalEvent'


const eventi = [
    {
        day: '2020-11-04',
        evento: [{
            titolo: 'Lezione',
            durata: '3 ore',
            descrizione: 'Link della lezione'
        }]
    }, {
        day: '2020-11-05',
        evento: [{
            titolo: 'Lezione1',
            durata: '3 ore',
            descrizione: 'Link della lezione1'
        }]
    }, {
        day: '2020-11-18',
        evento: [{
            titolo: 'Lezione2',
            durata: '3 ore',
            descrizione: 'Link della lezione2'
        }]
    }, {
        day: '2020-11-25',
        evento: [{
            titolo: 'Lezione3',
            durata: '3 ore',
            descrizione: 'Link della lezione3'
        }]
    },

];


export default class LiveCalendar extends Component{
    constructor() {
    super();
    this.state = {
        isModalVisible: false,
        data:'',
      }
    }

    onChangeDate = (date) =>{
        this.setState({isModalVisible:true,data:date})
    }

    renderChildDay = (day) => {
        var flag = false;
        eventi.map((events) => {
        
            if(day === events.day){
                flag=true;
            }
            
        })
        if(flag){
            return <Icon name="lock" style={styles.icLockRed} />
        } 
    }

    handleModalClose = ()=>{
        this.setState({isModalVisible: false})
    }

    render() {
        return(
            <View style= {styles.containerModal}>
                <Text style = {styles.textLogin}>Calendar</Text>
                <Calendar
                    date={this.state.time}
                    changeDate={(date) => this.onChangeDate(date)}
                    format='YYYY-MM-DD'
                    renderChildDay={(day) => this.renderChildDay(day)}
                />
                <ModalEvent isModalVisible={this.state.isModalVisible} date={this.state.data} event={JSON.stringify(eventi)} handleClose={this.handleModalClose}/>
        </View>
        )
    };
}
     
const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerModal: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textLogin: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: "bold",
        marginTop:30
    },
    icLockRed: {
        width: 13 / 2,
        height: 9,
        position: 'absolute',
        top: 2,
        left: 1,
        color:'#008000'
      },
      text: {
        color: '#05375a',
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 35
      },
      action: {
        flexDirection: 'row',
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 7
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