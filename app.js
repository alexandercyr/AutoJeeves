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

import api from './utilities/api';


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};


 class AutoJeeves extends React.Component {
   
 render() {
        return (
            <Navigator
                initialRoute={{name: 'HomeScreen', component: HomeScreen}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    // count the number of func calls
                    console.log(route, navigator); 

                    if (route.component) {
                        return React.createElement(route.component, { navigator });
                    }
                }}
             />
        );
    }
}
class HomeScreen extends React.Component{
  
  onPressFeed() {
        this.props.navigator.push({
            name: 'CarScreen',
            component: CarScreen
        });
    }
  render() {
    return (
       <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Auto Jeeves!
        </Text>
        <Text style={styles.instructions}>
          Learn everything you need to know about your car's maintenance needs.
        </Text>
       <Button title ="Get Started!" onPress={this.onPressFeed.bind(this)}    
        />
          
      </View>
    );
  }
}
class CarScreen extends React.Component{
   constructor(props){
        super(props);
        this.state = {
            makes: [],
            makeName: ''
            
        }
    }
    componentWillMount(){
        api.getMakes().then((res) => {
            this.setState({
                makes: res.makes,
                makeName: res.makes[0].name
            })
        });
    }
   
   
  render() {
        console.log("Makes: ", this.state.makes);
        var data = this.state.makes.map(function(item) {
        return <Text> {item.id}{item.name}</Text>;
        });

   
    return (
       <View style={styles.container}>
        <Text style={styles.welcome}>
         Car Screen
        </Text>
        <Text style={styles.instructions}>
          Learn everything you need to know about your car's maintenance needs.
        </Text>
        
        {data}
      
          
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

AppRegistry.registerComponent('AutoJeeves', () => AutoJeeves);
