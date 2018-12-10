import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SettingScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10}}>
        <Text style={{fontWeight: "bold", color: "black", padding: 25, fontSize: 35}}>Settings</Text>

        <Text style={{color: "black", padding: 25, fontSize: 21}}>Usuario</Text>
          <Text style={{color: "green", textAlign:"center", fontSize: 20}}>A04</Text>

        <Text style={{color: "black", padding: 25, fontSize: 21}}>Email</Text>
          <Text style={{color: "black", textAlign:"center", fontSize: 20}}>10</Text>

      </View>

    );
  }
}


export default SettingScreen;
