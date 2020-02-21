import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import './App.css';

class LocationButton extends Component {
    state = {
        showSpinner: false
    }

    componentDidMount() {
        this.props.onRef(this)
      }
    
    gpsClicked = () => {
        this.props.recenter();
    }

    showSpinner() {
        this.setState({showSpinner: true});
    }

    hideSpinner() {
        this.setState({showSpinner: false});
    }

    render() {
        return (
            <Button id="gpsbutton" variant="light" onClick={this.gpsClicked}>
                { this.state.showSpinner ? <Spinner animation="border" size='sm'/> 
                : <Image id ="gpsimg" src={require('./images/gps-button.png')}/> }
            </Button>
        );
    }
};

export default LocationButton;
