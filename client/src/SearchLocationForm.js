import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import SearchInput from './SearchInput.js';
import ExtraSearchInput from './ExtraSearchInput.js';
import DatePicker from 'react-bootstrap-date-picker';

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
            },
            extraDestination: {
                stop1: {
                    lat: null,
                    lng: null,
                },
                stop2: {
                    lat: null,
                    lng: null,
                },
                stop3: {
                    lat: null,
                    lng: null,
                },
            },
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
        this.setState({ pickupLocation: { lat: location.lat(), lng: location.lng() } });
        this.props.handlePickup(this.state.pickupLocation.lat, this.state.pickupLocation.lng);
    }

    removePickupLocation = () => {
        this.setState({ pickupLocation: { lat: null, lng: null } });
        this.props.removePickup();
    }

    setDropoffLocation = (location) => {
        this.setState({ dropoffLocation: { lat: location.lat(), lng: location.lng() } });
        this.props.handleDropoff(this.state.dropoffLocation.lat, this.state.dropoffLocation.lng);
    }

    removeDropoffLocation = () => {
        this.setState({ dropoffLocation: { lat: null, lng: null } });
        this.props.removeDropoff();
    }

    setAddtionalDest = (id, location) => {
        switch (id) {
            case '1':
                this.setState({ extraDestination: { stop1: { lat: location.lat, lng: location.lng } } });
                this.props.handleExtraStops(id, location);
                break;
            case '2':
                this.setState({ extraDestination: { stop2: { lat: location.lat, lng: location.lng } } });
                this.props.handleExtraStops(id, location);
                break;
            case '3':
                this.setState({ extraDestination: { stop3: { lat: location.lat, lng: location.lng } } });
                this.props.handleExtraStops(id, location);
                break;
            default:
                console.log("Error in setAdditionalDest: wrong id")
        }
    }

    removeAddtionalDest = (id) => {
        switch (id) {
            case '1':
                this.setState({ extraDestination: { stop1: { lat: null, lng: null } } });
                this.props.removeExtraSteps(id);
                break;
            case '2':
                this.setState({ extraDestination: { stop2: { lat: null, lng: null } } });
                this.props.removeExtraSteps(id);
                break;
            case '3':
                this.setState({ extraDestination: { stop3: { lat: null, lng: null } } });
                this.props.removeExtraSteps(id);
                break;
            default:
                console.log("Error in removeAdditionalDest: wrong id")
        }
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <SearchInput
                        id='pickupLocation'
                        name='Pick up location'
                        setLocation={this.setPickupLocation}
                        removeMarker={this.removePickupLocation}
                    />
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} id='locationButton' block>
                        Use current location
                    </Button>
                </Form.Group>
                <Form.Group>
                    <ExtraSearchInput
                        id='1'
                        name='Add destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                    />
                    <ExtraSearchInput
                        id='2'
                        name='Add destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                    />
                    <ExtraSearchInput
                        id='3'
                        name='Add destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                    />
                </Form.Group>
                <Form.Group>
                    <SearchInput
                        id='dropoffLocation'
                        name='Drop off location'
                        setLocation={this.setDropoffLocation}
                        removeMarker={this.removeDropoffLocation}
                    />
                </Form.Group>
                <Form.Group>
                    <DatePicker/>
                </Form.Group>
            </Form >
        );
    }
}

export default SearchLocationForm;