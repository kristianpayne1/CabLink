import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import SearchInput from './SearchInput.js';

class SearchLocationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pickupLocation: {
                lat: 0,
                lng: 0,
            },
            dropoffLocation: {
                lat: 0,
                lng: 0,
            }
        };
    }

    handleCurrentLocation = () => {
        let pickupSearch = document.getElementById('pickupLocation');
        if (!(this.props.currentLat === 0 && this.props.currentLong === 0)) {
            pickupSearch.value = this.props.currentLat + ' ' + this.props.currentLong;
            this.props.handlePickup(this.props.currentLat, this.props.currentLong);
        }
    }

    setPickupLocation = (location) => {
        this.setState({pickupLocation: {lat: location.lat(), lng: location.lng()}});
        this.props.handlePickup(this.state.pickupLocation.lat, this.state.pickupLocation.lng);
    }

    setDropoffLocation = (location) => {
        this.setState({dropoffLocation: {lat: location.lat(), lng: location.lng()}});
        this.props.handleDropoff(this.state.dropoffLocation.lat, this.state.dropoffLocation.lng);
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <SearchInput 
                        id='pickupLocation' 
                        name='Pick up location'
                        setLocation={this.setPickupLocation}
                    />
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} id='locationButton' block>
                        Use current location
                     </Button>
                </Form.Group>
                <Form.Group>
                    <SearchInput 
                        id='dropoffLocation' 
                        name='Drop off location'
                        setLocation={this.setDropoffLocation}
                    />
                </Form.Group>
            </Form>
        );
    }
}

export default SearchLocationForm;