/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Alert,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';



class firstPage extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'first'
        }
    }
    
  render(){
  return(
    <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Auto Jeeves!
        </Text>
        <Text style={styles.instructions}>
          Learn everything you need to know about your car's maintenance needs.
        </Text>
       <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
          
      </View>
  );
}
}


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


