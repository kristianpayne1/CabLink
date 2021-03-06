import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PickupPin from './PickupPin';
import DriverPin from './DriverPin.js';
import "./map.css";
const google = window.google;

// map used for when viewing pickup
class PickupMap extends Component {
    // default to university of kent
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
        pickupLocation: {
            lat: null,
            lng: null,
        },
        driverLocation: {
            lat: null,
            lng: null,
        },
    }

    // centers the map to view entire route 
    viewPickup = () => {
        if (this.state.pickupLocation.lat !== null && this.state.driverLocation.lat !== null) {
            let bounds = new google.maps.LatLngBounds();
            bounds.extend(this.state.pickupLocation);
            bounds.extend(this.state.driverLocation);
            this.state.map.setCenter(bounds.getCenter());
            this.state.map.fitBounds(bounds);
            this.state.map.setZoom(this.state.map.getZoom() - 1);
        }
    }

    // when on standby center map to driver's location
    viewDriver = () => {
        this.state.map.setCenter(this.state.driverLocation);
        this.state.map.setZoom(18);
    }

    // moves the driver along to pickup location in realistc time
    runPickUp = (path, duration) => {
        // duration of driver to pickup divide by how many points in path
        let timeInterval = (duration.value * 1000) / path.length;
        let self = this;
        let index = 0;
        this.viewPickup();
        let interval = setInterval(function () {
            // if not cancelled
            if (!(self.props.cancelled)) {
                self.viewPickup();
                // get location of next in the route
                let latlng = path[index++];
                // update progress bar
                self.props.updateProgress((index / path.length) * 100);
                // update driver's location
                self.setState({ driverLocation: { lat: latlng.lat(), lng: latlng.lng() } });
                // when booking complete update driver's location on database
                if (index === path.length) {
                    clearInterval(interval);
                    self.props.handleDriverLocation(self.state.driverLocation);
                }
            }else{
                // if cancelled stop pickup and complete booking
                clearInterval(interval);
                self.props.handleDriverLocation(self.state.driverLocation);
            }
        }, timeInterval)
    }

    // using Googles map get route from driver's location to pick up location
    getRoute = (waitTime, cb) => {
        let maps = this.state.maps;
        let self = this;
        this.setState({ pickupLocation: { lat: this.props.info.pickupLocation.lat, lng: this.props.info.pickupLocation.lng }, driverLocation: { lat: this.props.info.driver.driverLocation.lat, lng: this.props.info.driver.driverLocation.lng } },
            function () {
                let directionsService = new maps.DirectionsService();
                let directionsDisplay = new maps.DirectionsRenderer();

                directionsService.route({
                    origin: { lat: self.state.driverLocation.lat, lng: self.state.driverLocation.lng },
                    destination: { lat: self.state.pickupLocation.lat, lng: self.state.pickupLocation.lng },
                    travelMode: 'DRIVING',
                    drivingOptions: {
                        departureTime: new Date(),
                        trafficModel: 'bestguess'
                    },
                    unitSystem: maps.UnitSystem.IMPERIAL,
                }, (response, status) => {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        // self.setState({
                        //     routePolyline: new maps.Polyline({
                        //         path: response.routes[0].overview_path,
                        //         strokeColor: '#007bff'
                        //     })
                        // });
                        //console.log(response.routes[0].overview_path);
                        if (self.props.info.standby === false) {
                            self.runPickUp(response.routes[0].overview_path, directionsDisplay.directions.routes[0].legs[0].duration_in_traffic);
                        } else {
                            self.viewDriver();
                            cb(waitTime - directionsDisplay.directions.routes[0].legs[0].duration_in_traffic.value * 1000);
                        }
                        //self.state.routePolyline.setMap(map);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            });
    }

    apiIsLoaded = (map, maps) => {
        if (map) {
            this.setState({ map: map, maps: maps });
            let self = this;
            this.props.getBookingInfo(function (waitTime, cb) {
                self.getRoute(waitTime, cb);
            });
        }
    }

    render() {
        return (
            <div className="mapContainer">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAb2fQDVRAkT8KMln_0HIX6s0zVcz06_3U' }}  // this is our API key
                    defaultCenter={this.props.center}
                    zoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
                >
                    <PickupPin
                        lat={this.state.pickupLocation.lat}
                        lng={this.state.pickupLocation.lng}
                        name="Pick up location"
                        color="green"
                    />
                    <DriverPin
                        lat={this.state.driverLocation.lat}
                        lng={this.state.driverLocation.lng}
                        name="Drop off location"
                        color="white"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default PickupMap;