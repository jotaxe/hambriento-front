import React, { Component } from 'react'
import {Modal, View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {ListItem, Badge} from "react-native-elements";
import utility from '../../utility';

function getFood(current) {
    return fetch('http://'+ utility.ip +':4242/menu?restaurantName='+current, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
    })
  }

export default class RestaurantModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            foods: null,
            visible: this.props.visible
        }
    }
    componentDidMount = () => {
        const {name} = this.props;
        Promise.resolve(getFood(name)).then((response) => response.json().then((food) => { console.log("data: ", food.data); this.setState({foods: food.data})}))
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.name !== this.props.name){
            Promise.resolve(getFood(name)).then((response) => response.json().then((food) => { console.log(food); this.setState({foods: food.data})}))
        }
    }
    
    render() {
        const {name, appreciation} = this.props;
        const {visible, foods} = this.state;
        const foodList = foods ? foods.map((food, index) => {return {key: index.toString(), name: food.name, price: food.price};}) : null;
        console.log(foodList);
        return (
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.handlePress}
            >
                
                <View style={styles.modalContainer}>
                    <Text style={styles.tituloModal}>{`${name}`}</Text>
                    <View style={styles.innerContainer}>
                        <Text>{this.props.owner}</Text> 
                        <Badge  value={appreciation}/> 
                    </View>
                    
                    <FlatList 
                        style={styles.list}
                        data={foodList}
                        renderItem={({item}) => 
                            (
                                <ListItem
                                    title={item.name}
                                    subtitle={item.appreciation}
                                    badge={{ containerStyle:{ backgroundColor: '#578d95'}, value: `$${item.price}`, textStyle: { color: 'white' }, containerStyle: { marginTop: 5 } }}
                                />
                            )
                        }
                     /> 
                    <View style={styles.innerContainer}>    
                        <TouchableOpacity style={styles.button} onPress={this.props.handlePress}>
                            <Text
                                style={styles.textButton}
                            >
                                Cerrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    list: {
        margin: 20,
    },
    button:{
        marginBottom: 20
    },
    modalContainer: {
        justifyContent: 'center',
        height: 300,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        marginTop: 100,
        marginLeft: 10,
        marginRight: 10,
        borderColor: "black"
    },
    tituloModal: {
        marginTop: 0,
        textAlignVertical: 'top',
        textAlign: 'center',
        fontSize:20
    },
    innerContainer: {
      alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
    button: {
        width: 300,
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        position: 'relative',
        marginTop: 10
    },
    textButton: {
        color: '#578d95',
        fontWeight: 'bold'
      },
  });