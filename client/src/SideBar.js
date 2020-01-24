import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class SideBar extends Component {

    handleCurrentLocation = () => {
        let pickupSearch = document.getElementById('Pickup');
        pickupSearch.value = this.props.currentLat + ' ' + this.props.currentLong;
    }

    render() {
        let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
        return (
            <div className={sidebarClass}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Choose pick-up & drop off
                         </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formPickUp">
                                        <InputGroup className="mb-3">
                                            <FormControl id="Pickup"
                                                placeholder="Pick up location"
                                                aria-label="Pick up location"
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
                                    <Form.Group controlId="formDropOff">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Drop off location"
                                                aria-label="Drop off location"
                                                aria-describedby="basic-addon2"
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-primary">Search</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Choose cab
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>This is where user will select their desired cab</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Payment
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>This is where user will make payment</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Button variant="light" onClick={this.props.toggleSidebar} className="sidebar-toggle">Toggle Sidebar</Button>
            </div>
        );
    }
}

export default SideBar;