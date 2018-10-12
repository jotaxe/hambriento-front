import React from 'react';
import { MapView } from 'expo';
import {getSellers} from "../Api";
import Menu from "../Menu";
import {View} from 'react-native';

export default class MapScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            long: null,
            error: null,
            sellers: null
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( (position) => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                error: null,
            });
        },
        (error) => {
            this.setState({error: error.message});
        },
        );

        Promise.resolve(getSellers()).then((sellersData) => {
            this.setState({sellers: sellersData.data});
            console.log(sellersData);
        }).catch((error) => {console.log(error);});
        
    }
    
    render() {
        const {lat, long, error, sellers} = this.state;
        const sellersMarks = sellers ? sellers.map((seller, index) => {return (<MapView.Marker coordinate={{"latitude": seller.lat, "longitude": seller.long }} key={index} title={seller.name}/>)}) : null;
        console.log(error); 
        console.log(lat, long);
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

                {sellersMarks}            
            </MapView>
            <Menu navigation={this.props.navigation}/>
        </View>
        );
    }
}