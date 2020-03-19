import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SearchLocationForm from './SearchLocationForm';
import DriverListing from './DriverListing.js';
import CustomToggle from './CustomToggle.js';
import ConfirmBooking from './ConfirmBooking.js';
import OptionsForm from './OptionsForm.js';
import "./SideBar.css";

// sidebar used in booking page
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.DriverListing = React.createRef();
    }

    // lists all drivers in driver lsiting
    showDrivers = async () => {
        await this.DriverListing.current.loadDrivers();
    }

    render() {
        // if the user hasn't specified a drop off or pick up location disable continue button
        let disableContinueCab = ((this.props.pickupLocation.lat === null && this.props.pickupLocation.lng === null)
            || (this.props.dropoffLocation.lat === null && this.props.dropoffLocation.lng === null))
            ? true : false;
        // toggles if the sidebar is open or not.
        let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
        let sidebarButton = this.props.isOpen ? 'sidebar-toggle open' : 'sidebar-toggle';
        return (
            <div className={sidebarClass}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            Choose Pick-Up & Drop Off
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
                                    content="Continue to Extra Options"
                                    showDrivers={null}
                                    variant="outline-primary"
                                    block={true}
                                    size="sm"
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            Extra Options
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <CustomToggle
                                    disabled={false}
                                    eventKey="0"
                                    content="Return to Pick-Up and Drop-Off"
                                    showDrivers={null}
                                    variant="outline-primary"
                                    block={true}
                                    size="sm"
                                />
                                <OptionsForm setLuggage={this.props.setLuggage} setDisabled={this.props.setDisabled} setPassangers={this.props.setPassangers}/>
                                <CustomToggle
                                    disabled={false}
                                    eventKey="2"
                                    content="Continue to Choose Cab"
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
                            Choose Cab
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body style={{ 'maxHeight': '64vh', 'overflowY': 'auto' }}>
                                <CustomToggle
                                    disabled={false}
                                    eventKey="1"
                                    content="Return to Extra Options"
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
                                    handleDriverInfo={this.props.handleDriverInfo}
                                    ref={this.DriverListing}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            Payment
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <ConfirmBooking
                                    pickupLocation={this.props.pickupLocation}
                                    dropoffLocation={this.props.dropoffLocation}
                                    price={this.props.price}
                                    time={this.props.time}
                                    isArrivingLater={this.props.isArrivingLater}
                                    driver={this.props.selectedDriver}
                                    duration={this.props.duration}
                                    passangers={this.props.passangers}
                                    disabled={this.props.disabled}
                                    luggage={this.props.luggage}
                                    handlePaymentShow={this.props.handlePaymentShow}
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