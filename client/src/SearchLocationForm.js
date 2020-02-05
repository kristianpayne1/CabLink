import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import SearchInput from './SearchInput.js';

class SearchLocationForm extends Component {

    handleCurrentLocation = () => {
        let pickupSearch = document.getElementById('pickupLocation');
        pickupSearch.value = this.props.currentLat + ' ' + this.props.currentLong;
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <InputGroup className="mb-3">
                        <FormControl id='pickupLocation'
                            placeholder='Pick up location'
                            aria-label='Puck up location'
                            aria-describedby="basic-addon2"
                            value=''
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Button variant="outline-primary" size="sm" onClick={this.handleCurrentLocation} block>
                        Use current location
                     </Button>
                </Form.Group>
                <Form.Group>
                <InputGroup className="mb-3">
                        <FormControl id='dropoffLocation'
                            placeholder='Drop off location'
                            aria-label='Drop off location'
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        );
    }
}

export default SearchLocationForm;