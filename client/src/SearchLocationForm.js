import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchInput from './SearchInput.js';

class SearchLocationForm extends Component {

    handleCurrentLocation = () => {
        let pickupSearch = document.getElementById('pickUp');
        pickupSearch.value = this.props.currentLat + ' ' + this.props.currentLong;
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <SearchInput name='Pick up location' id='autocomplete'/>
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} block>
                        Use current location
                     </Button>
                </Form.Group>
                <Form.Group>
                    <SearchInput name='Drop off location' id='dropOff'/>
                </Form.Group>
            </Form>
        );
    }
}

export default SearchLocationForm;