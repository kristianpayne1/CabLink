import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import logo from './logo.svg';
import CurrentPin from './CurrentPin.js'
 
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 51.296942,
      lng: 1.063161
    },
    zoom: 15
  };

  state = {
    currentLat: 0,
    currentLong: 0,
  };

  apiIsLoaded = (map, maps) => {
    if (map) {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({currentLat: position.coords.latitude, currentLong: position.coords.longitude});
          const latLng = new maps.LatLng(parseFloat(this.state.currentLat), parseFloat(this.state.currentLong)); // Makes a latlng
          map.panTo(latLng);
        })
      } else {
        console.log("not yet")
      }
    }
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly otherwise it won't appear
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAb2fQDVRAkT8KMln_0HIX6s0zVcz06_3U' }}  // this is our API key
          defaultCenter={this.props.center}
          zoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          <CurrentPin
            lat={this.state.currentLat}
            lng={this.state.currentLong}
            name="You"
            color="deepskyblue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMap;