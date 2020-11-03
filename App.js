import React , {Component} from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import MainScreenNavigator from './app/config/router'
import createStackNavigator from 'react-navigation-stack';

const stack = createStackNavigator;

class App extends Component {
  state = {};
  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2b2b39" barStyle="light-content"></StatusBar>
        <MainScreenNavigator/>
      </View>
    );
  }
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
