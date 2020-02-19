import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SearchLocationForm from './SearchLocationForm';
import DriverListing from './DriverListing.js';
import CustomToggle from './CustomToggle.js';

class SideBar extends Component {

    render() {
        let disableContinueCab = ((this.props.pickupLocation.lat === null && this.props.pickupLocation.lng === null)
            || (this.props.dropoffLocation.lat === null && this.props.dropoffLocation.lng === null))
            ? true : false;
        let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
        let sidebarButton = this.props.isOpen ? 'sidebar-toggle open' : 'sidebar-toggle';
        return (
            <div className={sidebarClass}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            Choose pick-up & drop off
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <SearchLocationForm
                                    currentLat={this.props.currentLat}
                                    currentLong={this.props.currentLong}
                                    handlePickup={this.props.handlePickup}
                                    handleDropoff={this.props.handleDropoff}
                                    handleExtraStops={this.props.handleExtraStops}
                                    removePickup={this.props.removePickup}
                                    removeDropoff={this.props.removeDropoff}
                                    removeExtraSteps={this.props.removeExtraSteps}
                                />
                                <CustomToggle
                                    disabled={disableContinueCab}
                                    eventKey="1"
                                    content="Continue to choose cab"
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            Choose cab
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body style={{ 'maxHeight': '70vh', 'overflowY': 'auto' }}>
                                <CustomToggle
                                    disabled={false}
                                    eventKey="0"
                                    content="Return to pick up & drop off"
                                />
                                <DriverListing
                                    drivers={this.props.drivers}
                                    showDriver={this.props.showDriver}
                                    currentLat={this.props.currentLat}
                                    currentLong={this.props.currentLong}
                                    pickupLocation={this.props.pickupLocation}
                                    dropoffLocation={this.props.dropoffLocation}
                                    extraStopLocation1={this.props.extraStopLocation1}
                                    extraStopLocation2={this.props.extraStopLocation2}
                                    extraStopLocation3={this.props.extraStopLocation3}
                                    distance={this.props.distance}
                                    duration={this.props.duration}
                                    setPrice={this.props.setPrice}
                                    removePrice={this.props.removePrice}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            Payment
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Button variant="outline-primary" disabled block size='sm'>
                                    Change pick up & drop off
                                </Button>
                                <Button variant="outline-primary" disabled block size='sm'>
                                    Change cab
                                </Button>
                                <Button variant="outline-success" disabled block>
                                    Continue to payment
                                </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Button variant="light" onClick={this.props.toggleSidebar} className={sidebarButton}>></Button>
            </div>
        );
    }
}

export default SideBar;