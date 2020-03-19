import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import './App.css';

// Used to retrieve users location and centers them to their location
class LocationButton extends Component {
    state = {
        showSpinner: false
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    // when button is clicked center to user location
    gpsClicked = () => {
        this.props.recenter();
    }

    // when getting user's location show spinner
    showSpinner() {
        this.setState({ showSpinner: true });
    }

    // stop showing spinner when user location is being shown
    hideSpinner() {
        this.setState({ showSpinner: false });
    }

    render() {
        return (
            <Button id="gpsbutton" variant="light" onClick={this.gpsClicked}>
                {this.state.showSpinner ? <Spinner animation="border" size='sm' />
                    : <Image id="gpsimg" src={require('./images/gps-button.png')} />}
            </Button>
        );
    }
};

export default LocationButton;
