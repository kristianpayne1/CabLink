import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

// for google API calls
const google = window.google;

// for extra stops autocomplete
class ExtraSearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            location: {
                lat: 0,
                lng: 0,
            },
            query: '',
            disabled: true,
        };
    }

    // prapare autocomplete options
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

    // sets location and name of place selected and sends it back to booking
    handlePlaceSelect = () => {

        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;
        const geometry = addressObject.geometry;

        if (address) {
            this.setState(
                {
                    locationName: address[0].long_name,
                    location: { lat: geometry.location.lat(), lng: geometry.location.lng() },
                    query: addressObject.formatted_address,
                }
            );
            this.props.setLocation(this.props.id, this.state.location);
        }
    }

    // if input changes clear selected address and location.
    handleOnChange = (event) => {
        this.setState({ query: event.target.value });
        if (this.state.locationName !== '') {
            this.props.removeAddtionalDest(this.props.id);
            this.setState({locationName: ''});
        }
    }

    // handles whether input field is disabled or enabled 
    handleOnClick = () => {
        if (this.state.disabled === true) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
            this.setState({ query: '' });
            this.props.removeAddtionalDest(this.props.id);
        }
    }

    render() {
        let buttonVariant = this.state.disabled ? 'outline-success' : 'outline-danger';
        let buttonSign = this.state.disabled ? '+' : '-';
        return (
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button variant={buttonVariant} onClick={this.handleOnClick}>{buttonSign}</Button>
                </InputGroup.Prepend>
                <FormControl id={this.props.id}
                    placeholder={this.props.name}
                    aria-label={this.props.name}
                    aria-describedby="basic-addon2"
                    value={this.state.query}
                    onChange={this.handleOnChange}
                    disabled={this.state.disabled}
                />
            </InputGroup>
        );
    }
}

export default ExtraSearchInput;
