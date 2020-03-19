import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

class OptionsForm extends Component {

    handleLuggageChange = (evt) => {
        this.props.setLuggage(evt.target.checked);
    }

    handleDisabilityChange = (evt) => {
        this.props.setDisabled(evt.target.checked);
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group>
                        <br/>
                        Number of Passengers:
                    <ToggleButtonGroup className="passangers" type="radio" name="passangers" defaultValue={1} size='sm'>
                            <ToggleButton value={1} variant="outline-primary" onClick={() => this.props.setPassangers(1)}>1</ToggleButton>
                            <ToggleButton value={2} variant="outline-primary" onClick={() =>this.props.setPassangers(2)}>2</ToggleButton>
                            <ToggleButton value={3} variant="outline-primary" onClick={() =>this.props.setPassangers(3)}>3</ToggleButton>
                            <ToggleButton value={4} variant="outline-primary" onClick={() =>this.props.setPassangers(4)}>4</ToggleButton>
                        </ToggleButtonGroup>
                        <br/><br/>
                        <Form.Check
                            label="Additional Luggage?"
                            onChange={this.handleLuggageChange}
                        />
                        <Form.Check
                            label="Disability Requirements?"
                            onChange={this.handleDisabilityChange}
                        />
                        <br/>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default OptionsForm;