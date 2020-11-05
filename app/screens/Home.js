import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import HomeUser from './user/HomeUser';

class Home extends React.Component {
      constructor(props){
          super(props);
      }
    state = {}
    render() {
        
            if(this.props.route.params.userType =='UT'){
               return (<HomeUser />)
            }else if(this.props.route.params.userType =='PT'){
                //TODO: implementa home PT
            }else if(this.props.route.params.userType =='NT'){
                //TODO: implementa home nutrizionista
            }
    }
}

export default Home;