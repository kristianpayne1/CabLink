import React, { Component } from 'react';
import GoogleMap from './map.js';
import SideBar from './SideBar.js';

class Booking extends Component {
    state = {
        sidebarOpen: false
    };

    handleViewSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    render() {
        return (
            <div>
                <GoogleMap />
                <SideBar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar} />
            </div>
        );
    }
}

export default Booking;