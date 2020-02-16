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
    };

    handleViewSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    setDrivers = (data) => {
        this.setState({ drivers: data })
    }

    setLocation = (lat, long) => {
        this.setState({ currentLat: lat, currentLong: long })
    }

    handlePickup = (lat, long) => {
        this.map.current.setPickupMarker(lat, long);
        this.setState({ pickupLocation: { lat: lat, lng: long } });
    }

    removePickup = () => {
        this.map.current.removePickupMarker();
        this.setState({ pickupLocation: { lat: null, lng: null } });
    }

    handleDropoff = (lat, long) => {
        this.map.current.setDropoffMarker(lat, long);
        this.setState({ dropoffLocation: { lat: lat, lng: long } });
    }

    removeDropoff = () => {
        this.map.current.removeDropoffMarker();
        this.setState({ dropoffLocation: { lat: null, lng: null } });
    }

    handleExtraStops = (id, location) => {
        this.map.current.setExtraStopMarkers(id, location);
        switch (id) {
            case '1':
                this.setState({ extraStop1Location: { lat: location.lat, lng: location.long } });
                break;
            case '2':
                this.setState({ extraStop2Location: { lat: location.lat, lng: location.long } });
                break;
            case '3':
                this.setState({ extraStop3Location: { lat: location.lat, lng: location.long } });
                break;
            default:
                console.log('Something went wrong')
        }
    }

    removeExtraSteps = (id) => {
        this.map.current.removeExtraStopMarkers(id);
        switch (id) {
            case '1':
                this.setState({ extraStopLocation1: { lat: null, lng: null } });
                break;
            case '2':
                this.setState({ extraStopLocation2: { lat: null, lng: null } });
                break;
            case '3':
                this.setState({ extraStopLocation3: { lat: null, lng: null } });
                break;
            default:
                console.log('Something went wrong');
        }
    }

    showDriver = (lat, lng) => {
        this.map.current.centerToPoint(lat, lng)
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
                />
            </div>
        );
    }
}

export default Booking;