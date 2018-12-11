import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Modal, StyleSheet } from 'react-native';
import { Body, List, ListItem, Input, Right } from 'native-base';

import utility from '../../utility';

class RestaurantScreen extends Component {
  state = {
    restaurants: [],
    foods: [],
    visible: false,
    currentRestaurant: ""
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
        this.setState({restaurants: responseJSON.data})
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Error! vuelve a intentarlo')
      })
    })
  }

  fetchFood(current) {
    fetch('http://'+ utility.ip +':4242/menu?restaurantName='+current, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      this.setState({foods: responseJSON.data})
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('Error! vuelve a intentarlo')
    })
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  toggleModal(visible, currentRestaurant) {
    this.setState({ visible: visible, currentRestaurant: currentRestaurant });
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
              <TouchableOpacity onPress = {() => {this.toggleModal(true, current.name) || this.fetchFood(current.name)}} style={{marginRight:5}}>
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

  foodsList(){
    return this.state.foods.map((current,index) => {
      return (
        <ListItem thumbnail key={index} style={{backgroundColor:'white', marginBottom:10}}>
          <Body>
            <Text>{"$"+current.price+" "+current.name}</Text>
          </Body>
          <Right>
            <View style={{flexDirection:'row'}}>
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
        <Modal animationType = {"slide"} transparent = {false}
          visible = {this.state.visible}
        >
          <View style={{flexDirection:'row', paddingTop: 70, paddingLeft: 25}}>
            <Text style={{fontWeight: "bold", color: "black", marginRight:"20%", fontSize: 30}}>
              {this.state.currentRestaurant}
            </Text>

            <TouchableOpacity>
              <Text style={{fontWeight: "bold", color: "#00AEEF",  fontSize: 30}}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <List style={{marginRight:17, paddingTop:30}}>
            {this.foodsList()}
          </List>

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {this.toggleModal(!this.state.visible)}}
          >
            <Text style={styles.textButtonLogin}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </Modal>

        <View style={{flexDirection:'row', padding: 25}}>
          <Text style={{fontWeight: "bold", color: "black", marginRight:"30%", fontSize: 35}}>
            Mis Locales
          </Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor:'grey'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute'
  },
  imageLogin: {
    width: 100,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 110
  },
  inputText: {
    width: 300,
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: '#FFF',
    position: 'relative',
    flexDirection: 'row',
    textAlign: 'center'
  },
  buttonLogin: {
    width: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 15,
    left: "25%",
    paddingBottom: 15,
    borderRadius: 20,
    position: 'relative',
    marginTop: 10
  },
  textButtonLogin: {
    color: 'green',
    fontWeight: 'bold'
  },
  textRecoverPassword: {
    color: '#FFF',
    position: 'relative',
    top: 180
  }
})

export default RestaurantScreen;
