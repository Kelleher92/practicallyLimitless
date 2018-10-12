import React, {Component} from 'react';
import LocationSearchBox from './LocationSearchBox';

class LocationMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: parseFloat(this.props.geoCoor.split(',')[0]),
            lng: parseFloat(this.props.geoCoor.split(',')[1]),
            address: this.props.address
        }

        this.map = null;
        this.onCompanyAddressChosen = this.onCompanyAddressChosen.bind(this);
        this.onCompanyAddressChange = this.onCompanyAddressChange.bind(this);
    }

    componentDidMount() {
        let me = this;
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 14,
            gestureHandling: 'greedy',
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });
        
        this.initPin();

        this.map.addListener('click', function(e) {
            me.mapClicked(e);
        });
    }

    mapClicked(e) {
        this.setState({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });

        this.movePin();
        this.props.newGeoCoor(this.state.lat + ',' + this.state.lng);
    }

    initPin() {
        this.marker = new google.maps.Marker({
            position: {lat: this.state.lat, lng: this.state.lng},
            map: this.map
        });
    }

    movePin() {
        this.marker.setPosition({lat: this.state.lat, lng: this.state.lng});
    }

    onCompanyAddressChosen(lat, lng, address) {
        var geoCoor = lat + ',' + lng;
        this.setState({
            lat: lat,
            lng: lng,
            address: address
        });

        this.props.newAddress(this.state.address);
        this.props.newGeoCoor(geoCoor);
        this.centerMap(lat, lng);
    }

    centerMap(lat, lng) {
        this.marker.setPosition({lat: lat, lng: lng});
        this.map.setCenter({lat: lat, lng: lng}); 
    }

    onCompanyAddressChange(address) {
        this.setState({
            address: address
        });
    }

    render() {
        return (
            <div className="form-body">
                <div className="map__container">
                    <LocationSearchBox className="form-input__value" placeHolder="Company Address" value={this.state.address} onPlaceSelect={this.onCompanyAddressChosen} onAddressUpdate={this.onCompanyAddressChange} />
                    <div className="map" id="map"></div>
                </div>
            </div>
        );
    }
}

export default LocationMap;