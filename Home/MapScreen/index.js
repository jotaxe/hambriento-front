import React from 'react';
import { MapView } from 'expo';
import {View} from 'react-native';
import Modal from "./restaurantModal";
import utility from '../../utility';

function getRestaurants(){
    return fetch('http://'+ utility.ip +':4242/restaurants', {
        method: 'GET'
    });
}

export default class MapScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lat: null,
            long: null,
            error: null,
            restaurants: null,
            currentRestaurant: null,
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( (position) => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                error: null,
                modalVisible: false,
                currentRestaurant: null
            });
        },
        (error) => {
            this.setState({error: error.message});
        },
        );

        Promise.resolve(getRestaurants()).then((res) => {
            res.json().then((restaurants) => this.setState({restaurants: restaurants.data}))
        }).catch((error) => {console.log(error);});

    }

    onPressRestaurant = (restaurant) => {
        this.setState({currentRestaurant: restaurant, modalVisible: true});
    }

    render() {
        const {lat, long, error, restaurants, currentRestaurant, modalVisible} = this.state;
        
        const restaurantsMarks = restaurants ? restaurants.map(
            (restaurant, index) => (
                <MapView.Marker 
                    id={restaurant.id}
                    coordinate={
                        {
                            "latitude": restaurant.latitude, 
                            "longitude": restaurant.longitude 
                        }
                    } 
                    key={index} 
                    title={restaurant.name}
                    onPress={(e) => this.onPressRestaurant(restaurant)}
                />

            )
        ) : null;
        return (
            <View style={{
                height: "100%",
                width: "100%"
              }}
            >
                <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: lat || -33.452642,
                longitude: long || -70.660966,
                latitudeDelta: 0.0003,
                longitudeDelta: 0.003,
                }}
            >

                {!!lat && !!long &&  <MapView.Marker
                coordinate={{"latitude":lat,"longitude":long}}
                title={"Tu Ubicación"}
                pinColor="blue"/>}

                {restaurantsMarks}
            </MapView>
            
            {currentRestaurant ? (<Modal handlePress={() => {this.setState({modalVisible: false})}} name={currentRestaurant.name} visible={modalVisible} appreciation={currentRestaurant.appreciation} owner={currentRestaurant.owner}/>) : null}

        </View>
        );
    }
}
