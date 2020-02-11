import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import logo from './logo.svg';
import CurrentPin from './CurrentPin.js';
import DriverPin from './DriverPin.js';
import LocationButton from './LocationButton.js';
import MapControl from './MapControl.js';
import PickupPin from './PickupPin.js';
import DropoffPin from './DropoffPin.js';

const google = window.google;

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 51.296942,
      lng: 1.063161
    },
    zoom: 15
  };

  state = {
    map: null,
    maps: null,
    mapControlShouldRender: false,
    pickupLocation: {
      lat: null,
      lng: null,
    },
    dropoffLocation: {
      lat: null,
      lng: null,
    },
  };

  callAPI() {
    let self = this;
    fetch('http://localhost:5000/driver/get', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.props.updateDrivers(data);
    }).catch(err => {
      console.log('caught it!', err);
      console.log('Make sure database is connected');
    })
  };

  getDrivers() {
    return (
      this.props.drivers.map(driver =>
        <DriverPin
          lat={driver.currentLat}
          lng={driver.currentLong}
          name={driver.firstname}
          color="black"
          key={driver.driverID}
        />
      )
    )
  }

  centerToPoint = (lat, lng) => {
    const latLng = new this.state.maps.LatLng(parseFloat(lat), parseFloat(lng)); // Makes a latlng
    //this.state.map.setZoom(15); zoom in not smooth will fix later
    this.state.map.panTo(latLng);
  }

  setPickupMarker = (lat, long) => {
    if (!(lat === null && long === null)) {
      console.log("Showing pick up location");
      this.setState({ pickupLocation: { lat: lat, lng: long } });
      if (this.state.dropoffLocation.lat === null && this.state.dropoffLocation.lng === null) {
        this.centerToPoint(lat, long);
      }
    }
    this.drawRoute();
  }

  setDropoffMarker = (lat, long) => {
    if (!(lat === null && long === null)) {
      console.log("Showing drop off location");
      this.setState({ dropoffLocation: { lat: lat, lng: long } });
      if (this.state.pickupLocation.lat === null && this.state.pickupLocation.lng === null) {
        this.centerToPoint(lat, long);
      }
    }
    this.drawRoute();
  }

  viewRoute = () => {
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.pickupLocation);
    bounds.extend(this.state.dropoffLocation);
    this.state.map.setCenter(bounds.getCenter());
    this.state.map.fitBounds(bounds);
    this.state.map.setZoom(this.state.map.getZoom()-1);
  }

  drawRoute = () => {
    if (this.state.dropoffLocation.lat !== null && this.state.pickupLocation.lat !== null) {
      console.log('Drawing ride route');
      this.viewRoute();
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer();

      directionsService.route({
        origin: { lat: this.state.pickupLocation.lat, lng: this.state.pickupLocation.lng },
        destination: { lat: this.state.dropoffLocation.lat, lng: this.state.dropoffLocation.lng },
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          const routePolyline = new google.maps.Polyline({
            path: response.routes[0].overview_path
          });
          routePolyline.setMap(this.state.map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  onSpinner = () => {
    this.LocationButton.showSpinner();
  }

  offSpinner = () => {
    this.LocationButton.hideSpinner();
  }

  apiIsLoaded = (map, maps) => {
    if (map) {
      this.setState({ map: map, maps: maps });
      this.setState({ mapControlShouldRender: true });
      if (navigator.geolocation) {
        this.onSpinner();
        navigator.geolocation.getCurrentPosition((position) => {
          this.offSpinner();
          this.props.updateLocation(position.coords.latitude, position.coords.longitude);
          const latLng = new maps.LatLng(parseFloat(this.props.currentLat), parseFloat(this.props.currentLong)); // Makes a latlng
          map.panTo(latLng);
        })
      } else {
        console.log("not found")
      }
      this.callAPI();
    }
  };

  recenterToUser = () => {
    if (this.state.map) {
      if (navigator.geolocation) {
        this.onSpinner();
        navigator.geolocation.getCurrentPosition((position) => {
          this.offSpinner();
          this.props.updateLocation(position.coords.latitude, position.coords.longitude);
          const latLng = new this.state.maps.LatLng(parseFloat(this.props.currentLat), parseFloat(this.props.currentLong)); // Makes a latlng
          //this.state.map.setZoom(15); zoom in not smooth will fix later
          this.state.map.panTo(latLng);
        });
      } else {
        console.log("User not found yet");
      }
    } else {
      console.log("Map hasn't loaded");
    }
  };

  render() {
    return (
      // Important! Always set the container height explicitly otherwise it won't appear
      <div style={{ height: '92vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAb2fQDVRAkT8KMln_0HIX6s0zVcz06_3U' }}  // this is our API key
          defaultCenter={this.props.center}
          zoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          <CurrentPin
            lat={this.props.currentLat}
            lng={this.props.currentLong}
            name="You"
            color="deepskyblue"
          />
          {this.getDrivers()}
          <PickupPin
            lat={this.state.pickupLocation.lat}
            lng={this.state.pickupLocation.lng}
            name="Pick up location"
            color="green"
          />
          <DropoffPin
            lat={this.state.dropoffLocation.lat}
            lng={this.state.dropoffLocation.lng}
            name="Drop off location"
            color="red"
          />
          <MapControl map={this.state.map || null}
            controlPosition={this.state.maps ? this.state.maps.ControlPosition.RIGHT_BOTTOM : null}
          >
            <LocationButton recenter={this.recenterToUser.bind(this)} onRef={ref => (this.LocationButton = ref)} />
          </MapControl>
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
