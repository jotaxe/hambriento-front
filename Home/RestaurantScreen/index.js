import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Body, List, ListItem, Input, Right } from 'native-base';

import utility from '../../utility';

class RestaurantScreen extends Component {
  state = {
    restaurants: [],
    restaurantModal: false,
  }

  fetchRestaurants() {
    AsyncStorage.getItem('username', (err, username) => {
      fetch('http://'+ utility.ip +':4242/restaurantsbyusername?username='+username, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON)
        this.setState({restaurants: responseJSON.data})
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Error! vuelve a intentarlo')
      })
    })
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  restaurantsList(){
    return this.state.restaurants.map((current,index) => {
      return (
        <ListItem thumbnail key={index} style={{backgroundColor:'white', marginBottom:10}}>
          <Body>
            <Text>{current.name}</Text>
          </Body>
          <Right>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginRight:5}}>
                <Text style={{color:"green"}}> Menu </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{color:"red"}}> Eliminar </Text>
              </TouchableOpacity>
            </View>
          </Right>
        </ListItem>
      )
    });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10}}>
        <View style={{flexDirection:'row', padding: 25}}>
          <Text style={{fontWeight: "bold", color: "black", marginRight:"30%", fontSize: 35}}>Mis Locales</Text>

          <TouchableOpacity>
            <Text style={{fontWeight: "bold", color: "#00AEEF",  fontSize: 34}}> + </Text>
          </TouchableOpacity>
        </View>

        <List style={{marginRight:17}}>
          {this.restaurantsList()}
        </List>
      </View>

    );
  }
}


export default RestaurantScreen;
