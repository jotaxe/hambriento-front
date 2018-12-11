import React from 'react';
import { MapView } from 'expo';
import {View} from 'react-native';
import Modal from "./restaurantModal";

function getRestaurants(){
    return [{
        id: 1,
        name: "restaurant 1",
        owner: "test1",
        appreciation: "5",
        latitude: -33.452342,
        longitude: -70.660966
    },{
        id: 2,
        name: "restaurant 2",
        owner: "test2",
        appreciation: "4",
        latitude: -33.452640,
        longitude: -70.660464
    }]
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

        Promise.resolve(getRestaurants()).then((restaurants) => {
            this.setState({restaurants});
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
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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
