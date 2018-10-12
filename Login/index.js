import React, { Component } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { authenticate } from '../Api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;
    const user = {username, password};
    Promise.resolve(authenticate(user)).then((user) => {
        if(user.accessToken){
            this.props.navigation.navigate("MapScreen");
        }
    }).catch(() => {
        alert("Usuario invalido");
    })
  }

  onRegister() {
      this.props.navigation.navigate("Singup");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Usuario'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Contraseña'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Iniciar Sesión'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        
        <Button
          title={'Registrarse'}
          style={styles.input}
          onPress={this.onRegister.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
