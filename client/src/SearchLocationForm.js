import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import SearchInput from './SearchInput.js';
import ExtraSearchInput from './ExtraSearchInput.js';
import TimePicker from 'react-bootstrap-time-picker';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './SearchLocationForm.css';

class SearchLocationForm extends Component {
    constructor(props) {
        super(props);
        this.SearchInput = React.createRef();
        this.state = {
            pickupLocation: {
                lat: 0,
                lng: 0,
                address: '',
            },
            dropoffLocation: {
                lat: 0,
                lng: 0,
                address: '',
            },
            extraDestination: {
                stop1: {
                    lat: null,
                    lng: null,
                    address: '',
                },
                stop2: {
                    lat: null,
                    lng: null,
                    address: '',
                },
                stop3: {
                    lat: null,
                    lng: null,
                    address: '',
                },
            },
            time: '',
            showDatetime: false,
        };
    }

    handleCurrentLocation = () => {
        if (!(this.props.currentLat === 0 && this.props.currentLong === 0)) {
            this.SearchInput.current.handleShowCurrentLocation();
            this.props.handlePickup(this.props.currentLat, this.props.currentLong, 'Your location');
        }
    }

    setPickupLocation = (location, name) => {
        this.setState({ pickupLocation: { lat: location.lat(), lng: location.lng(), address: name } });
        this.props.handlePickup(this.state.pickupLocation.lat, this.state.pickupLocation.lng, name);
    }

    removePickupLocation = () => {
        this.setState({ pickupLocation: { lat: null, lng: null, address: '' } });
        this.props.removePickup();
    }

    setDropoffLocation = (location, name) => {
        this.setState({ dropoffLocation: { lat: location.lat(), lng: location.lng(), address: name } });
        this.props.handleDropoff(this.state.dropoffLocation.lat, this.state.dropoffLocation.lng, name);
    }

    removeDropoffLocation = () => {
        this.setState({ dropoffLocation: { lat: null, lng: null, address: '' } });
        this.props.removeDropoff();
    }

    setAddtionalDest = (id, location, name) => {
        switch (id) {
            case '1':
                this.setState({ extraDestination: { stop1: { lat: location.lat, lng: location.lng, address: name } } });
                this.props.handleExtraStops(id, location, name);
                break;
            case '2':
                this.setState({ extraDestination: { stop2: { lat: location.lat, lng: location.lng, address: name } } });
                this.props.handleExtraStops(id, location, name);
                break;
            case '3':
                this.setState({ extraDestination: { stop3: { lat: location.lat, lng: location.lng, address: name } } });
                this.props.handleExtraStops(id, location, name);
                break;
            default:
                console.log("Error in setAdditionalDest: wrong id")
        }
    }

    removeAddtionalDest = (id) => {
        switch (id) {
            case '1':
                this.setState({ extraDestination: { stop1: { lat: null, lng: null, address: '' } } });
                this.props.removeExtraSteps(id);
                break;
            case '2':
                this.setState({ extraDestination: { stop2: { lat: null, lng: null, address: '' } } });
                this.props.removeExtraSteps(id);
                break;
            case '3':
                this.setState({ extraDestination: { stop3: { lat: null, lng: null, address: '' } } });
                this.props.removeExtraSteps(id);
                break;
            default:
                console.log("Error in removeAdditionalDest: wrong id")
        }
    }

    handleChange = value => {
        if (value === 1) {
            this.setState({ showDatetime: false });
        } else {
            this.setState({ showDatetime: true });
        }
    }

    handleTimeChange = (time) => {
        this.props.handleTimeChange(time);
        if (time === 'ASAP') {
            this.props.handleIsArrivingLater(false);
        }
    }

    render() {
        let time = this.props.time === 'ASAP' ?
            new Date().getHours() + ':' + (Math.round(new Date().getMinutes() / 15) * 15) % 60 : this.props.time;
        let dateTime = this.state.showDatetime ?
            <div className='datepicker'>
                <TimePicker
                    format={24}
                    start="00:00"
                    end="23:59"
                    step={15}
                    onChange={this.handleTimeChange}
                    value={time}
                />
            </div> : null

        return (
            <Form>
                <Form.Group>
                    <SearchInput
                        id='pickupLocation'
                        name='Pick-Up Location'
                        setLocation={this.setPickupLocation}
                        removeMarker={this.removePickupLocation}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                        ref={this.SearchInput}
                    />
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} id='locationButton' block>
                        Use Current Location
                    </Button>
                </Form.Group>
                <Form.Group>
                    <ExtraSearchInput
                        id='1'
                        name='Add Destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                    <ExtraSearchInput
                        id='2'
                        name='Add Destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                    <ExtraSearchInput
                        id='3'
                        name='Add Destination'
                        setLocation={this.setAddtionalDest}
                        removeAddtionalDest={this.removeAddtionalDest}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                </Form.Group>
                <Form.Group>
                    <SearchInput
                        id='dropoffLocation'
                        name='Drop-Off Location'
                        setLocation={this.setDropoffLocation}
                        removeMarker={this.removeDropoffLocation}
                        currentLat={this.props.currentLat}
                        currentLong={this.props.currentLong}
                    />
                </Form.Group>
                <Form.Group>
                    <ToggleButtonGroup id="frame" type="radio" name="options" defaultValue={1} size='sm' onChange={this.handleChange}>
                        <ToggleButton value={1} variant="outline-primary" onClick={() => this.handleTimeChange('ASAP')}>Leave ASAP</ToggleButton>
                        <ToggleButton value={2} variant="outline-primary" onClick={() => this.props.handleIsArrivingLater(false)}>Depart By</ToggleButton>
                        <ToggleButton value={3} variant="outline-primary" onClick={() => this.props.handleIsArrivingLater(true)}>Arrive By</ToggleButton>
                    </ToggleButtonGroup>
                    {dateTime}
                </Form.Group>
            </Form >
        );
    }
}

export default SearchLocationForm;