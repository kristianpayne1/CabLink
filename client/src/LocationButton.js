import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

class LocationButton extends Component {
    gpsClicked = () => {
        this.props.recenter();
    }

    render() {
        return (
            <Button variant="light" onClick={this.gpsClicked}><Image src={require('./images/gps-button.png')} height='25px' width='25px' /></Button>
        );
    }
};

export default LocationButton;
