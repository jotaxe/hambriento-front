import React, { Component } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { singup } from '../Api';

export default class Singup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onRegister = () => {
    const { username, password} = this.state;
    const user = {username, password};
    Promise.resolve(singup(user)).then(() => {
      alert("Usuario registrado exitosamente!");
      this.props.navigation.navigate("Login");
    })
    
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
          title={'Registrar'}
          style={styles.input}
          onPress={this.onRegister}
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
