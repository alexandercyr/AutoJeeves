/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  StackNavigator
} from 'react-navigation';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Alert,
  Navigator,
  View
} from 'react-native';

class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return (
       <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Auto Jeeves!
        </Text>
        <Text style={styles.instructions}>
          Learn everything you need to know about your car's maintenance needs.
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('Car')}
          title="Get Started"
        />
          
      </View>
    );
  }
}

class CarScreen extends React.Component{
  static navigationOptions = {
    title: 'Car Selection',
  };
  render(){

    return (
       <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Auto Jeeves!
        </Text>
        <Text style={styles.instructions}>
          Learn everything you need to know about your car's maintenance needs.
        </Text>
        
          
      </View>
    );
  }
}


const AutoJeeves = StackNavigator({
  Home: { screen: HomeScreen },
  Car: { screen: CarScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AutoJeeves', () => AutoJeeves);
