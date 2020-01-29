import React, { Component } from 'react';
import Script from 'react-load-script';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            location: '',
            query: ''
        };
    }

    handleScriptLoad = () => {
        const options = { types: ['address'] };

        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(this.props.id),
            options);

        this.autocomplete.setFields(
            ['address_components',
                'formatted_address',
                'geometry']);

        this.autocomplete.addListener('place_changed',
            this.handlePlaceSelect);

        console.log('Places API loaded');
    }

    handlePlaceSelect = () => {

        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;
        const geometry = addressObject.geometry;

        if (address) {
            this.setState(
                {
                    locationName: address[0].long_name,
                    location: geometry.location,
                    query: addressObject.formatted_address,
                }
            );
        }
    }

    handleOnChange = (event) => {
        this.setState({ query: event.target.value });
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAb2fQDVRAkT8KMln_0HIX6s0zVcz06_3U&libraries=places"
                    onLoad={this.handleScriptLoad}
                />
                <FormControl id={this.props.id}
                    placeholder={this.props.name}
                    aria-label={this.props.name}
                    aria-describedby="basic-addon2"
                    value={this.state.query}
                    onChange={this.handleOnChange}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default SearchInput;