import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import moment from 'moment'



function Timer({ interval }){
    const pad = (n) => n < 10 ? '0' + n : n
    const duration = moment.duration(interval)
    const centiSecond = Math.floor(duration.milliseconds()/10)
    return ( 
    <Text style={styles.timer}>
        {pad(duration.minutes())}:{pad(duration.seconds())},{pad(centiSecond)}    
    </Text>
    )
}


class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            start: 0,
            now: 0,
            resume:false,
            started:true,
            stopped:false,
            laps: [ ]
        }
    }

    start = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            laps: [0],
            started: false
        })

        this.timer = setInterval(() =>{
            this.setState({ now: new Date().getTime()})
        },100)
    }

    stop = () => {
        clearInterval(this.timer)
        const { laps, now, start } = this.state
        const [firstLap, ...other] = laps
         this.setState({
            laps: [firstLap + now - start, ...other],
            start: 0,
            now: 0,
            resume: true,
            started:false
         })
    }

    resume = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            started:false,
            stopped:true,
            resume:false
        })

        this.timer = setInterval(() =>{
            this.setState({ now: new Date().getTime()})
        },100)  
    }

    reset = () => {
        this.setState({
            start: 0,
            now: 0,
            resume: false,
            laps:[],
            started: true
        })
    }

    render() {
        const { now, start, laps, resume, started} = this.state
        const timer = now - start
        return (
            <View style={styles.container}>
                <Timer interval={laps.reduce((total,curr) => total + curr, 0) + timer}/>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button,{ backgroundColor: '#3D3D3D'}]} onPress={this.reset}>
                        <Text style={{color: '#FFFFFF',fontSize: 18}}>Reset</Text>
                    </TouchableOpacity>

                    {started && (
                        <TouchableOpacity style={[styles.button,{ backgroundColor: '#1B361F'}]} onPress={this.start}>
                            <Text style={{color: '#50D167',fontSize: 18}}>Start</Text>
                        </TouchableOpacity>  
                    )}

                    {start > 0 && (
                        <TouchableOpacity style={[styles.button,{ backgroundColor: '#3C1715'}]} onPress={this.stop}>
                            <Text style={{color: '#E33935',fontSize: 18}}>Stop</Text>
                        </TouchableOpacity>
                    )}

                    {resume && (
                        <TouchableOpacity style={[styles.buttonResume,{ backgroundColor: '#1B361F'}]} onPress={this.resume}>
                            <Text style={{color: '#50D167',fontSize: 18}}>Resume</Text>
                        </TouchableOpacity>  
                    )}
                    
                    
                    
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
    buttonResume: {
        width: 70,
        height: 70,
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
