import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Modal, StyleSheet, TextInput } from 'react-native';
import { Body, List, ListItem, Input, Right } from 'native-base';

import utility from '../../utility';

class RestaurantScreen extends Component {
  state = {
    restaurants: [],
    foods: [],
    visible: false,
    visibleFood: false,
    currentRestaurant: "",
    foodName:"",
    foodPrice:"",
    restaurantName:""
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
        alert('Error! vuelve a intentarlo')
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
      this.setState({foods: responseJSON.data})
    })
    .catch((error) => {
      console.log(error)
      alert('Error! vuelve a intentarlo')
    })
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  toggleModal(visible, currentRestaurant) {
    this.setState({ visible: visible, currentRestaurant: currentRestaurant });
  }

  fetchNewFood(){
    const price = parseInt(this.state.foodPrice)
    fetch('http://'+ utility.ip +':4242/new-food', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: this.state.foodName,
        price: price,
        resturanteName: this.state.currentRestaurant,
        appreciaton: 5
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      alert('Comida agregada!')
      this.fetchFood(this.state.currentRestaurant)
    })
    .catch((error) => {
      console.log(error)
      alert('Error! vuelve a intentarlo')
    })
  }

  fetchNewRestaurant(){
    const { restaurantName } = this.state;
    AsyncStorage.getItem('username', (err, username) => {
      navigator.geolocation.getCurrentPosition( (position) => {
        console.log("lala")
        fetch('http://'+utility.ip+':4242/new-restaurant', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: restaurantName,
            appreciaton: 5,
            owner: username,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
        })
        .then(response => response.json())
        .then(responseJSON => {
          alert('Local agregado!')
          this.fetchRestaurants()
        })
        .catch(error => alert(error))
      });
    })
  }

  fetchEraseFood(name, restaurant){
    fetch('http://'+ utility.ip +':4242/erase-food?foodName='+name+'&restaurantName='+restaurant, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      alert('Comida eliminada!')
      this.fetchFood(this.state.currentRestaurant)
    })
    .catch((error) => {
      console.log(error)
      alert('Error! vuelve a intentarlo')
    })
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
              <TouchableOpacity onPress={() => {this.fetchEraseFood(current.name, this.state.currentRestaurant)}}>
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
        <Modal className="MenuList" animationType = {"slide"} transparent = {false}
          visible = {this.state.visible}
        >
          <View style={{flexDirection:'row', paddingTop: 70, paddingLeft: 25}}>
            <Text style={{fontWeight: "bold", color: "black", marginRight:"20%", fontSize: 30}}>
              {this.state.currentRestaurant}
            </Text>

            <TouchableOpacity onPress={() => {this.fetchNewFood()}}>
              <Text style={{fontWeight: "bold", color: "#00AEEF",  fontSize: 30}}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            editable={true}
            placeholder='Nombre del producto'
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref='foodName'
            autoCapitalize='none'
            style={styles.inputText}
            onChangeText={(foodName) => this.setState({ foodName })}
            value={this.state.foodName}
          />

          <TextInput
            editable={true}
            placeholder='Precio'
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref='foodPrice'
            autoCapitalize='none'
            style={styles.inputText}
            onChangeText={(foodPrice) => this.setState({ foodPrice })}
            value={this.state.foodPrice}
          />


          { !this.state.foods ?
             <Text style={{textAlign:'center'}}> No hay comidas :( </Text>
              :
              <List style={{marginRight:17, paddingTop:30}}>
                {this.foodsList()}
              </List>
          }

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

          <TouchableOpacity onPress={() => { this.fetchNewRestaurant() }}>
            <Text style={{fontWeight: "bold", color: "#00AEEF",  fontSize: 34}}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          editable={true}
          placeholder='Nuevo Local'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='restaurantName'
          autoCapitalize='none'
          style={styles.inputText}
          onChangeText={(restaurantName) => this.setState({ restaurantName })}
          value={this.state.restaurantName}
        />

        { !this.state.restaurants ?
           <Text style={{textAlign:'center'}}> No hay locales :( </Text>
            :
            <List style={{marginRight:17}}>
              {this.restaurantsList()}
            </List>
        }

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
    backgroundColor: 'grey',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    left: "5%",
    color: 'white',
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
