import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
//import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const google = window.google;

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            location: {
                lat: 0,
                lng: 0,
            },
            query: ''
        };
    }

    componentDidMount = () => {
        const options = { types: ['address'] };

        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(this.props.id),
            options);

        this.autocomplete.setFields(
            ['address_components',
                'formatted_address',
                'geometry']);

        this.autocomplete.addListener('place_changed',
            this.handlePlaceSelect);

    }

    handlePlaceSelect = () => {

        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;
        const geometry = addressObject.geometry;

        if (address) {
            this.setState(
                {
                    locationName: address[0].long_name,
                    location: {lat: geometry.location.lat(), lng: geometry.location.lng()},
                    query: addressObject.formatted_address,
                }
            );
            this.props.setLocation(geometry.location);
        }
    }

    handleOnChange = (event) => {
        this.setState({ query: event.target.value });
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl id={this.props.id}
                    placeholder={this.props.name}
                    aria-label={this.props.name}
                    aria-describedby="basic-addon2"
                    value={this.state.query}
                    onChange={this.handleOnChange}
                />
            </InputGroup>
        );
    }
}

export default SearchInput;
