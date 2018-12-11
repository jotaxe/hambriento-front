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

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue)
    } catch (error) {
      console.log('AsyncStorage error:' + error.message)
    }
  }

  handleSignIn = () => {
    if (this.checkValuesForm()) {
      fetch('http://'+ utility.ip +':4242/login', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.saveItem('token', responseJSON.data.token);
        this.saveItem('email', responseJSON.data.email);
        this.saveItem('username', this.state.username);
        this.props.navigation.navigate("Home")
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      Alert.alert('Ingresar nombre de usuario y password')
    }
  }

  checkValuesForm = () => {
    if (!this.state.username || !this.state.password)
      return false
    else
      return true
  }

  onRegister() {
      this.props.navigation.navigate("Singup");
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
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
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
          onPress={this.handleSignIn.bind(this)}
          style={styles.buttonLogin}
        >
          <Text
            style={styles.textButtonLogin}
          >
            Ingresar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onRegister.bind(this)}
          style={styles.buttonLogin}
        >
          <Text
            style={styles.textButtonLogin}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login
