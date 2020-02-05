import React, { Component } from 'react';
import GoogleMap from './map.js';
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
                />
            </div>
        );
    }
}

export default Booking;