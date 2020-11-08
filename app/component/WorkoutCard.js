import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';


class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render(){
        const scheda=this.props.scheda;
        
            return (
                // scheda.map((u, i) => {
                // <View style={{ width: 300, height: 300 ,justifyContent: 'center',alignItems: 'stretch'}} >
                //     <Card >
                //         <Card.Title>{u.day}</Card.Title>
                //         <Card.Divider />
                //         {u.esercizi.map((u, i) => {
                //             return (
                //                 <View>
                //                     <Text> esercizio: {i + 1}</Text>
                //                     <Text>{u.esercizio1}</Text>
                //                     <Text>{u.recupero}</Text>
                //                     <Card.Divider />
                //                 </View>
                //             );
                //         }
    
                //         )}
                //     </Card>
                // </View>
                // })
                <Text>{this.props.scheda}</Text>
            );
    
      
    }
}
export default WorkoutCard;


// const WorkoutCard = ({scheda }) => (
//     this.scehda.map((u, i) => {
{/* <Card>
    <Card.Title>{u.day}</Card.Title>
    <Card.Divider />
    {u.esercizi.map((u, i) => {
        return (
            <View>
                <Text> esercizio: {i + 1}</Text>
                <Text>{u.esercizio1}</Text>
                <Text>{u.recupero}</Text>
                <Card.Divider />
            </View>
        );
    }

    )}
</Card> */}