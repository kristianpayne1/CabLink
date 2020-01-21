import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';

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
            <Button variant="light" onClick={this.gpsClicked}>
                { this.state.showSpinner ? <Spinner animation="border" size='sm'/> 
                : <Image src={require('./images/gps-button.png')} height='25px' width='25px' /> }
            </Button>
        );
    }
};

export default LocationButton;
