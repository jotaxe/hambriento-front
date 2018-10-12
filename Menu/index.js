import React, { Component } from 'react'
import ActionButton from 'react-native-action-button'; 
import {Text} from 'react-native';

export default class Menu extends Component {
    constructor(props){
        super(props)
    }
    
    onProfile = () =>{
        this.props.navigation.navigate("Profile");
    }

    onMap = () => {
        this.props.navigation.navigate("MapScreen");
    }
  render() {
    return (
        <ActionButton buttonColor="#3498db" >
            <ActionButton.Item 
            buttonColor="#3498db" 
            title="Perfil"
            onPress={this.onProfile}
            >
                 <Text>Perfil</Text>     
            </ActionButton.Item>

            <ActionButton.Item 
            buttonColor="#3498db" 
            title="Mapa"
            onPress={this.onMap}
            >
                 <Text>Mapa</Text>     
            </ActionButton.Item>

        </ActionButton>
    )
  }
}
