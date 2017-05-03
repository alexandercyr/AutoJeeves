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
  Picker,
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
                        return React.createElement(route.component, { navigator, route });
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
            component: CarScreen,
            
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
  
     onPressFeed() {
        this.props.navigator.push({
            name: 'MaintenanceScreen',
            component: MaintenanceScreen,
            passProps: { modelID: this.state.year, make: this.state.makeName, model: this.state.modelName },
        });
    }
   
   state = {
    carmake: 0,
    carmakeIndex: 0,
    carmakeID: 0,
    modelIndex: 0,
    year: 0,
    yearInt: 0,
    modelName: ''
    
  };
   constructor(props){
        super(props);
        this.state = {
            makes: [],
            models: [],
            years: [],
            makeName: '',
            carmakeIndex: 0,
            carmake: 0,
            
        }
    }
    componentWillMount(){
        api.getMakes().then((res) => {
            this.setState({
                carmake: 0,
                makes: res.makes,
                models: res.makes[0].models,
                years: res.makes[0].models[0].years,
                makeName: res.makes[0].name
            })
        });
    }
   
   
  render() {
        console.log("Makes: ", this.state.makes);
        var makeData = this.state.makes.map(function(item) {
        return <Text> {item.id}{item.name}</Text>;
        });
        var makePickerData = this.state.makes.map(function(item, i) {
        return <Picker.Item key={i} label={item.name} value={i} />;
        });
        console.log(this.state)
        var cars = this.state.makes
        var models = this.state.models
        var modelIndex = this.state.modelIndex
        
        var yearsData =  this.state.years.map(function(years, i) {
            var intString = (years.year).toString()
            return <Picker.Item key={i} value={years.id} label={intString} />;
  });
                console.log(this.state.year)
                console.log(this.state.makeName)
                console.log(this.state.modelName)

    return (
       <View style={styles.container}>
              <View style={styles.container}>

        <Text style={styles.instructions}>
            Select make of car
        </Text>
        
        <Picker
  style={styles.picker}
            selectedValue={this.state.carmake}
            onValueChange={ (carmake) => ( this.setState({carmake: carmake, modelIndex: 0, models: cars[carmake].models, makeName: cars[carmake].name }) ) }
            >
        {makePickerData}
      </Picker>
      </View>
             <View style={styles.container}>

      <Text style={styles.instructions}>
           Choose model of car
        </Text>
      <Picker
  style={styles.picker}
            selectedValue={this.state.modelIndex}
            onValueChange={ (modelName) => ( this.setState({modelIndex: modelName, years: models[modelIndex].years, modelName: modelName}) ) }
            >
        {this.state.models.map((modelName, i) => (
            
                <Picker.Item
              key={i}
              value={modelName.name}
              label={modelName.name}
              />  
            ))}
      </Picker>
      </View>
             <View style={styles.container}>

      <Text style={styles.instructions}>
           Choose year of car
        </Text>
      <Picker
  style={styles.picker}
            selectedValue={this.state.yearInt}
            onValueChange={ (years) => ( this .setState({year: years, yearInt: years}) ) }
            >
       {yearsData}
      </Picker>
      </View>
             <Button title ="Get Car Info" onPress={this.onPressFeed.bind(this)}  />  

      </View>
    );
  }

 changeMode = () => {
    const newMode = this.state.mode === Picker.MODE_DIALOG
        ? Picker.MODE_DROPDOWN
        : Picker.MODE_DIALOG;
    this.setState({mode: newMode});
  };

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}

class MaintenanceScreen extends React.Component{
  
  onPressFeed() {
        this.props.navigator.push({
            name: 'CarScreen',
            component: CarScreen,
            
        });
    }
     constructor(props){
        super(props);
        this.state = {
            actions: [],
           make: props.route.passProps.make,
        model: props.route.passProps.model,
        modelID: props.route.passProps.modelID,
            
        }
    }
    state = {
   
    }
   
    componentWillMount(){
        api.getService(this.state.modelID).then((res) => {
            this.setState({
                
                actions: res.actionHolder,
               
            })
        });
    }
    renderScene(route, navigator) {
  switch (route.id) {
    case 'home':
    return <Home navigator={navigator} {... route.props} />;
  }
}
    
  render() {
     var makeData = this.state.actions.map(function(item) {
        return <Text> {item.action}{item.item}</Text>;
        });
    return (
       <View style={styles.container}>
        <Text style={styles.welcome}>
          {makeData}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   picker: {
    width: 150,
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
