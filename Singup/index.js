import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native'

import utility from '../utility';

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
    width: 300,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
    position: 'relative',
    marginTop: 10
  },
  textButtonLogin: {
    color: '#578d95',
    fontWeight: 'bold'
  },
  textRecoverPassword: {
    color: '#FFF',
    position: 'relative',
    top: 180
  }
})

class Singup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user    : "",
      password : "",
      email: ""
    }
  }

  handleSignUp = () => {
    if (this.checkValuesForm()) {
      fetch('http://'+ utility.ip +':4242/new-user', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
            "username": this.state.user,
            "password": this.state.password,
            "email": this.state.email
        }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        alert("Usuario registrado exitosamente!");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Error! vuelve a intentarlo')
      })
    } else {
      Alert.alert('Ingresar nombre de usuario y password')
    }
  }

  checkValuesForm = () => {
    if (!this.state.user || !this.state.password || !this.state.email)
      return false
    else
      return true
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={require('./background-login.png')}
          style={styles.backgroundImage} />
        <TextInput
          editable={true}
          placeholder='Nombre de usuario'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='username'
          autoCapitalize='none'
          style={styles.inputText}
          onChangeText={(user) => this.setState({ user })}
          value={this.state.user}
        />

        <TextInput
          editable={true}
          placeholder='Email'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='email'
          autoCapitalize='none'
          style={styles.inputText}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          editable={true}
          placeholder='Password'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='password'
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={this.handleSignUp.bind(this)}
          style={styles.buttonLogin}
        >
          <Text
            style={styles.textButtonLogin}
          >
            Aceptar
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Singup;
