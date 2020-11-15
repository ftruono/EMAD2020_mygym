import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native'
import moment from 'moment'



const DATA = {
    timer:1234567
}

function Timer({ interval }){
    const duration = moment.duration(interval)
    const centiSecond = Math.floor(duration.milliseconds()/10)
    return ( 
    <Text style={styles.timer}>
        {duration.minutes()}:{duration.seconds()},{centiSecond}    
    </Text>
    )
}

class Clock extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Timer interval={DATA.timer}/>
                <View style={styles.buttonRow}>
                    <View style={[styles.button,{ backgroundColor: '#3D3D3D'}]}>
                        <Text style={{color: '#FFFFFF',fontSize: 18}}>Reset</Text>
                    </View>
                    <View style={[styles.button,{ backgroundColor: '#1B361F'}]}>
                        <Text style={{color: '#50D167',fontSize: 18}}>Start</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Clock;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20
    },
    timer: {
        fontSize: 60,
        fontWeight: '200'
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly'
    }
})
