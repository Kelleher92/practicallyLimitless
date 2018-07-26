import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import LocationMap__TextInput from './LocationMap__TextInput.js'

export class LocationMap extends Component {
    constructor(){
        super();
        this.state = {
            address: 'Address 1',
            latitude: 52.7977,
            longitude: -6.1599,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }

        // Binding to the handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

    }

    getUserCurrentLocation() {

    }

    setUserLocationFromMap() {
        // pass values from the map to the lat, lng
    }

    onMapClick(e){
        //var me = this;
        this.setState({['latitude']: e.latLng.lat()});
        this.setState({['longitude']: e.latLng.lng()});
    }

    onMapDblClick(){
       
    }

    onMarkerClick(props, marker, e){
    }

    handleChange(name, e){
        this.setState({[name]: e.target.value});
    }

    updateAddressInput(address){
        this.setState({[address]: address});
    }
    searchBoxPlacesChanged(){
        const places = google.maps.searchBox.getPlaces();
    }



    render() {
        const GMapComp = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={5}
                center={{ lat: this.state.latitude, lng: this.state.longitude }}
                onClick={
                    (e) => this.onMapClick(e)
                }
                onDblClick={
                    (e) => this.onMapDblClick(e)
                }

            >
                <SearchBox
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={
                        (e) => this.searchBoxPlacesChanged(e)
                    }
                >
                    <LocationMap__TextInput address={this.state.address} handleChangeInput = {this.updateAddressInput.bind(this)}/>
                </SearchBox>
            </GoogleMap>
        ));

        return(
            <div className="form__wrap">
                <div className="form__container">
                <div>Hello</div>
                    <GMapComp
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8mT1Hzafi1MrAYe3xHABzF_VSdWbNZGk&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: '100%' }} />}
                      containerElement={<div style={{ height: '100%' }} />}
                      mapElement={<div style={{ height: '100%' }} />}
                    />    
                </div>
            </div>
        );
    }
}

export default LocationMap;


