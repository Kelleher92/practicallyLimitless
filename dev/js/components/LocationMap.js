import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';


class LocationMap extends Component {
  constructor(){
    super();
    this.state = {
        lat: 41.0082,
        lng: 28.9784
    }

    this.map = null;
  }

  mapClicked(e){
    this.setState({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
    });

    this.movePin();
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

  render() {
    return (
        <div>
          <input id="gMap__search-input" className="controls" type="text" placeholder="Search Box" />
          <div style={{ width: 500, height: 500 }} id="map" />
        </div>
    );
  }
}

export default LocationMap;