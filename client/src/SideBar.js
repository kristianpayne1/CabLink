import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SearchLocationForm from './SearchLocationForm';
import DriverListing from './DriverListing.js';
import CustomToggle from './CustomToggle.js';
import ConfirmBooking from './ConfirmBooking.js';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.DriverListing = React.createRef();
    }

    showDrivers = async () => {
        await this.DriverListing.current.loadDrivers();
    }

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
                                    handleTimeChange={this.props.handleTimeChange}
                                    handleIsArrivingLater={this.props.handleIsArrivingLater}
                                    time={this.props.time}                                    
                                />
                                <CustomToggle
                                    disabled={disableContinueCab}
                                    eventKey="1"
                                    content="Continue to choose cab"
                                    showDrivers={this.showDrivers}
                                    variant="outline-primary"
                                    block={true}
                                    size="sm"
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
                                    showDrivers={null}
                                    variant="outline-primary"
                                    block={true}
                                    size="sm"
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
                                    time={this.props.time}
                                    isArrivingLater={this.props.isArrivingLater}
                                    ref={this.DriverListing}
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
                                <ConfirmBooking 
                                    pickupLocation={this.props.pickupLocation}
                                    dropoffLocation={this.props.dropoffLocation}
                                    price={this.props.price}
                                    time={this.props.time}
                                    isArrivingLater={this.props.isArrivingLater}
                                    driver={this.props.selectedDriver}
                                    duration={this.props.duration}
                                />
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