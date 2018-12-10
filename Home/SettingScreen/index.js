import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

class SettingScreen extends Component {
  state = {
    username: "",
    email: ""
  }

  componentDidMount(){
    AsyncStorage.getItem('username', (err, username) => {
      AsyncStorage.getItem('email', (err, email) => {
        this.setState({username: username, email: email})
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10}}>
        <Text style={{fontWeight: "bold", color: "black", padding: 25, fontSize: 35}}>Settings</Text>

        <Text style={{color: "black", padding: 25, fontSize: 21}}>Usuario</Text>
          <Text style={{color: "green", textAlign:"center", fontSize: 20}}>{this.state.username}</Text>

        <Text style={{color: "black", padding: 25, fontSize: 21}}>Email</Text>
          <Text style={{color: "green", textAlign:"center", fontSize: 20}}>{this.state.email}</Text>

      </View>

    );
  }
}


export default SettingScreen;
