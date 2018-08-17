import React, {Component} from 'react';

class LocationSearchBox extends Component {
    placeSelected(places) {
        if(places[0] != null) {
            this.props.onPlaceSelect(places[0].geometry.location.lat(), places[0].geometry.location.lng(), places[0].formatted_address);
        }
    }

    handleChange(name, e) {         
        this.props.onAddressUpdate(e.target.value);
    }

    componentDidMount() {
        let me = this;
        var searchInputContainer = document.getElementById('google-search-box');
        var searchBox = new google.maps.places.SearchBox(searchInputContainer);
        
        searchBox.addListener('places_changed', function(){
            me.placeSelected(searchBox.getPlaces());
        });
    }

    render() {
        return(
            <input id="google-search-box" onChange={(e) => this.handleChange("currentAddress", e)} className={this.props.className} value={this.props.value} placeholder={this.props.placeHolder} />
        );
    }
}

export default LocationSearchBox;