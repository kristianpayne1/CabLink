import React, { Component } from 'react';
import GoogleMap from './Map.js';
import SideBar from './SideBar.js';

class Booking extends Component {
    constructor(props){
        super(props);
        this.map = React.createRef();
    }

    state = {
        sidebarOpen: false,
        currentLat: 0,
        currentLong: 0,
        drivers: [],
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
    }

    removePickup = () => {
        this.map.current.removePickupMarker();
    }

    handleDropoff = (lat, long) => {
        this.map.current.setDropoffMarker(lat, long);
    }
    
    removeDropoff = () => {
        this.map.current.removeDropoffMarker();
    }

    handleExtraStops = (id, location) => {
        this.map.current.setExtraStopMarkers(id, location);
    }

    removeExtraSteps = (id) => {
        this.map.current.removeExtraStopMarkers(id);
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