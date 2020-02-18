import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import SearchInput from './SearchInput.js';
import ExtraSearchInput from './ExtraSearchInput.js';
import DateTimePicker from 'react-datetime-picker';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

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
            date: new Date(),
            showDatetime: false,
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

    onChange = date => this.setState({ date });

    handleChange = value => {
        if (value === 1) {
            this.setState({ showDatetime: false });
        } else {
            this.setState({ showDatetime: true });
        }
    }

    render() {
        let dateTime = this.state.showDatetime ?
        <div className='datepicker'>
            <br />
            <DateTimePicker
                onChange={this.onChange}
                value={this.state.date}
            />
            </div>: null;
        
        return (
            <Form>
                <Form.Group>
                    <SearchInput
                        id='pickupLocation'
                        name='Pick up location'
                        setLocation={this.setPickupLocation}
                        removeMarker={this.removePickupLocation}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
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
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                    <ExtraSearchInput
                        id='2'
                        name='Add destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                    <ExtraSearchInput
                        id='3'
                        name='Add destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                </Form.Group>
                <Form.Group>
                    <SearchInput
                        id='dropoffLocation'
                        name='Drop off location'
                        setLocation={this.setDropoffLocation}
                        removeMarker={this.removeDropoffLocation}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                </Form.Group>
                <Form.Group>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} size='sm' onChange={this.handleChange}>
                        <ToggleButton value={1} variant="outline-primary">Leave ASAP</ToggleButton>
                        <ToggleButton value={2} variant="outline-primary">Depart by</ToggleButton>
                        <ToggleButton value={3} variant="outline-primary">Arrive by</ToggleButton>
                    </ToggleButtonGroup>
                        {dateTime}
                </Form.Group>
            </Form >
        );
    }
}

export default SearchLocationForm;