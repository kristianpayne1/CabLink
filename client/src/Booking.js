import React, { Component } from 'react';
import GoogleMap from './map.js';
import SideBar from './SideBar.js';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
    }

    state = {
        sidebarOpen: false,
        currentLat: 0,
        currentLong: 0,
        drivers: [],
        pickupLocation: {
            lat: null,
            lng: null,
            address: '',
        },
        dropoffLocation: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation1: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation2: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation3: {
            lat: null,
            lng: null,
            address: '',
        },
        distance: null,
        duration: null,
        price: null,
        selectedDriver: null,
    };

    handleViewSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    setDrivers = (data) => {
        this.setState({ drivers: data });
    }

    setLocation = (lat, long) => {
        this.setState({ currentLat: lat, currentLong: long })
    }

    handlePickup = (lat, long, name) => {
        this.map.current.setPickupMarker(lat, long);
        this.setState({pickupLocation: { lat: lat, lng: long, address: name} });
    }

    removePickup = () => {
        this.map.current.removePickupMarker();
        this.setState({ pickupLocation: { lat: null, lng: null, name: '' } });
    }

    handleDropoff = (lat, long, name) => {
        this.map.current.setDropoffMarker(lat, long);
        this.setState({ dropoffLocation: { lat: lat, lng: long, address: name } });
    }

    removeDropoff = () => {
        this.map.current.removeDropoffMarker();
        this.setState({ dropoffLocation: { lat: null, lng: null, name: '' } });
    }

    setRouteInfo = (info) => {
        this.setState({ duration: info.duration, distance: info.distance })
    }

    handleExtraStops = (id, location, name) => {
        this.map.current.setExtraStopMarkers(id, location);
        switch (id) {
            case '1':
                this.setState({ route: { extraStop1Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            case '2':
                this.setState({ route: { extraStop2Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            case '3':
                this.setState({ route: { extraStop3Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            default:
                console.log('Something went wrong')
        }
    }

    removeExtraSteps = (id) => {
        this.map.current.removeExtraStopMarkers(id);
        switch (id) {
            case '1':
                this.setState({ route: { extraStopLocation1: { lat: null, lng: null, name: '' } } });
                break;
            case '2':
                this.setState({ route: { extraStopLocation2: { lat: null, lng: null, name: '' } } });
                break;
            case '3':
                this.setState({ route: { extraStopLocation3: { lat: null, lng: null, name: '' } } });
                break;
            default:
                console.log('Something went wrong');
        }
    }

    showDriver = (lat, lng, driver) => {
        this.map.current.centerToPoint(lat, lng);
        this.setState({selectedDriver: driver});
    }

    setPrice = (price) => {
        this.setState({price: price});
    }

    removePrice = () => {
        this.setState({price: null})
    }

    render() {
        return (
            <div>
                <GoogleMap
                    drivers={this.state.drivers}
                    currentLat={this.state.currentLat}
                    currentLong={this.state.currentLong}
                    updateDrivers={this.setDrivers}
                    updateLocation={this.setLocation}
                    setRouteInfo={this.setRouteInfo}
                    ref={this.map}
                />
                <SideBar
                    isOpen={this.state.sidebarOpen}
                    drivers={this.state.drivers}
                    currentLat={this.state.currentLat}
                    currentLong={this.state.currentLong}
                    toggleSidebar={this.handleViewSidebar}
                    handlePickup={this.handlePickup}
                    handleDropoff={this.handleDropoff}
                    handleExtraStops={this.handleExtraStops}
                    removePickup={this.removePickup}
                    removeDropoff={this.removeDropoff}
                    removeExtraSteps={this.removeExtraSteps}
                    showDriver={this.showDriver}
                    pickupLocation= {this.state.pickupLocation}
                    dropoffLocation = {this.state.dropoffLocation}
                    extraStopLocation1= {this.state.extraStopLocation1}
                    extraStopLocation2 = {this.state.extraStopLocation2}
                    extraStopLocation3 = {this.state.extraStopLocation3}
                    distance = {this.state.distance}
                    duration = {this.state.duration}
                    setPrice={this.setPrice}
                    price={this.state.price}
                    removePrice={this.removePrice}
                    selectedDriver={this.state.selectedDriver}
                />
            </div>
        );
    }
}

export default Booking;