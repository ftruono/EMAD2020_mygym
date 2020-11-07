import { DrawerContent } from '@react-navigation/drawer';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import DrawerNavigator from '../config/AppNavigator';
import HomeNT from './nutritionist/HomeNT';
import HomePT from './personaltrainer/HomePT';
import HomeUser from './user/HomeUser';

class Home extends React.Component {
      constructor(props){
          super(props);
      }
    state = {}
    render() {
           
            if(this.props.route.params.userType =='UT'){
               return (<HomeUser params={this.props}/>)
            }else if(this.props.route.params.userType =='PT'){
                //TODO: implementa home PT
                return (<HomePT params={this.props}/>)
            }else if(this.props.route.params.userType =='NT'){
                //TODO: implementa home nutrizionista
                return (<HomeNT params={this.props}/>)
            }
    }
}

export default Home;