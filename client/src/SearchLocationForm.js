import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import SearchInput from './SearchInput.js';

class SearchLocationForm extends Component {

    handleCurrentLocation = () => {
        let pickupSearch = document.getElementById('pickupLocation');
        if (!(this.props.currentLat === 0 && this.props.currentLong === 0)) {
            pickupSearch.value = this.props.currentLat + ' ' + this.props.currentLong;
            this.props.handlePickup(this.props.currentLat, this.props.currentLong);
        }
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <SearchInput id='pickupLocation' name='Pick up location'/>
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} id='locationButton' block>
                        Use current location
                     </Button>
                </Form.Group>
                <Form.Group>
                    <SearchInput id='dropoffLocation' name='Drop off location'/>
                </Form.Group>
            </Form>
        );
    }
}

export default SearchLocationForm;