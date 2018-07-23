import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class LocationMap extends Component {
    constructor(){
        super();
        this.state = {
            startLat: 52.7977,
            startLon: -6.1599,
            address: '',
            latitude: '',
            longitude: '',
        }
    }

    getUserCurrentLocation(){

    }

    setUserLocationFromMap(){
        // pass values from the map to the lat, lng
    }

    mapClicked(){
        alert('Map was clicked');
    }


    render(){
        return (
            <Map 
                google={this.props.google} 
                  initialCenter={{
                    lat: this.state.startLat,
                    lng: this.state.startLon
                  }}
                  zoom={15}
                  onClick={
                    this.mapClicked
                  }
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA8mT1Hzafi1MrAYe3xHABzF_VSdWbNZGk"
})(LocationMap)
