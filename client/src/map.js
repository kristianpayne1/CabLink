import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
//import logo from './logo.svg';
import CurrentPin from './CurrentPin.js';
import DriverPin from './DriverPin.js';
import LocationButton from './LocationButton.js';
import MapControl from './MapControl.js';
import PickupPin from './PickupPin.js';
import DropoffPin from './DropoffPin.js';
import ExtraStopPin from './ExtraStopPin';
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
    extraStopLocation1: {
      lat: null,
      lng: null,
    },
    extraStopLocation2: {
      lat: null,
      lng: null,
    },
    extraStopLocation3: {
      lat: null,
      lng: null,
    },
    routePolyline: null,
  };

  callAPI() {
    let self = this;
    fetch('http://localhost:5000/driver/get/all/info', {
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
    let self = this;
    if (!(lat === null && long === null)) {
      this.setState({ pickupLocation: { lat: lat, lng: long } });
      if (this.state.dropoffLocation.lat === null && this.state.dropoffLocation.lng === null) {
        this.centerToPoint(lat, long);
      }
    }
    this.drawRoute(function (err, directions) {
      if (!err) {
        self.handleRouteInfo(directions);
      }
    });
  }

  removePickupMarker = () => {
    this.setState({ pickupLocation: { lat: null, lng: null } });
    this.removeRoute();
  }

  setExtraStopMarkers = (id, location) => {
    switch (id) {
      case '1':
        this.setState({ extraStopLocation1: { lat: location.lat, lng: location.lng } });
        this.centerToPoint(location.lat, location.lng);
        break;
      case '2':
        this.setState({ extraStopLocation2: { lat: location.lat, lng: location.lng } });
        this.centerToPoint(location.lat, location.lng);
        break;
      case '3':
        this.setState({ extraStopLocation3: { lat: location.lat, lng: location.lng } });
        this.centerToPoint(location.lat, location.lng);
        break;
      default:
        console.log('Something went wrong');
    }
    this.drawRoute(function (err, directions) {
      if (!err) {
      }
    });
  }

  removeExtraStopMarkers = (id) => {
    switch (id) {
      case '1':
        this.setState({ extraStopLocation1: { lat: null, lng: null } }, () => {
          this.drawRoute(function (err, directions) {
            if (!err) {
            }
          });
        });
        break;
      case '2':
        this.setState({ extraStopLocation2: { lat: null, lng: null } }, () => {
          this.drawRoute(function (err, directions) {
            if (!err) {
            }
          });
        });
        break;
      case '3':
        this.setState({ extraStopLocation3: { lat: null, lng: null } }, () => {
          this.drawRoute(function (err, directions) {
            if (!err) {
            }
          });
        });
        break;
      default:
        console.log('Something went wrong');
    }
  }

  setDropoffMarker = (lat, long) => {
    let self = this;
    if (!(lat === null && long === null)) {
      this.setState({ dropoffLocation: { lat: lat, lng: long } }, () => {
        this.drawRoute(function (err, directions) {
          if (!err) {
            self.handleRouteInfo(directions);
          }
        });
      });
      if (this.state.pickupLocation.lat === null && this.state.pickupLocation.lng === null) {
        this.centerToPoint(lat, long);
      }
    }
  }

  removeDropoffMarker = () => {
    this.setState({ dropoffLocation: { lat: null, lng: null } });
    this.removeRoute();
  }

  viewRoute = () => {
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.pickupLocation);
    bounds.extend(this.state.dropoffLocation);
    if (!(this.state.extraStopLocation1.lat === null && this.state.extraStopLocation1.lng === null)) {
      bounds.extend(this.state.extraStopLocation1);
    }
    if (!(this.state.extraStopLocation2.lat === null && this.state.extraStopLocation2.lng === null)) {
      bounds.extend(this.state.extraStopLocation2);
    }
    if (!(this.state.extraStopLocation3.lat === null && this.state.extraStopLocation3.lng === null)) {
      bounds.extend(this.state.extraStopLocation3);
    }
    this.state.map.setCenter(bounds.getCenter());
    this.state.map.fitBounds(bounds);
    this.state.map.setZoom(this.state.map.getZoom() - 1);
  }

  handleRouteInfo = (directions) => {
    let totalDistance = 0;
    let totalDuration = 0;
    let legs = directions.routes[0].legs;
    for (var i = 0; i < legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration_in_traffic.value;
    }
    let totalDistanceText = totalDistance * 0.00018939 + ' miles';
    let totalDurationText = totalDuration / 60 + ' mins';
    this.props.setRouteInfo({ duration: {value: totalDuration, text: totalDurationText}, distance: {value: totalDistance, text: totalDistanceText} });
  }

  drawRoute = (cd) => {
    if (this.state.dropoffLocation.lat !== null && this.state.pickupLocation.lat !== null) {
      //this.removeRoute();
      //console.log('Drawing ride route');
      this.viewRoute();
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer();
      let waypoints = [];
      if (!(this.state.extraStopLocation1.lat === null && this.state.extraStopLocation1.lat === null)) {
        let stop = new this.state.maps.LatLng(parseFloat(this.state.extraStopLocation1.lat), parseFloat(this.state.extraStopLocation1.lng));
        waypoints.push({ location: stop });
      }
      if (!(this.state.extraStopLocation2.lat === null && this.state.extraStopLocation2.lat === null)) {
        let stop = new this.state.maps.LatLng(parseFloat(this.state.extraStopLocation2.lat), parseFloat(this.state.extraStopLocation2.lng));
        waypoints.push({ location: stop });
      }
      if (!(this.state.extraStopLocation3.lat === null && this.state.extraStopLocation3.lat === null)) {
        let stop = new this.state.maps.LatLng(parseFloat(this.state.extraStopLocation3.lat), parseFloat(this.state.extraStopLocation3.lng));
        waypoints.push({ location: stop });
      }

      directionsService.route({
        origin: { lat: this.state.pickupLocation.lat, lng: this.state.pickupLocation.lng },
        destination: { lat: this.state.dropoffLocation.lat, lng: this.state.dropoffLocation.lng },
        waypoints: waypoints,
        travelMode: 'DRIVING',
        drivingOptions: {
          // TODO change to depature time
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'bestguess'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          cd(null, directionsDisplay.directions)
          this.removeRoute();
          this.setState({
            routePolyline: new google.maps.Polyline({
              path: response.routes[0].overview_path,
              strokeColor: '#007bff'
            })
          });
          this.state.routePolyline.setMap(this.state.map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  removeRoute = () => {
    if (!(this.state.routePolyline === null)) {
      this.state.routePolyline.setMap(null);
      this.setState({ routePolyline: null });
      this.props.setRouteInfo({ duration: null, distance: null });
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
          <ExtraStopPin
            lat={this.state.extraStopLocation1.lat}
            lng={this.state.extraStopLocation1.lng}
            name="Extra stop location"
            color="blue"
            key='1'
          />
          <ExtraStopPin
            lat={this.state.extraStopLocation2.lat}
            lng={this.state.extraStopLocation2.lng}
            name="Extra stop location"
            color="blue"
            key='2'
          />
          <ExtraStopPin
            lat={this.state.extraStopLocation3.lat}
            lng={this.state.extraStopLocation3.lng}
            name="Extra stop location"
            color="blue"
            key='3'
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
