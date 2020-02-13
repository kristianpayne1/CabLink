import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SearchLocationForm from './SearchLocationForm';
import DriverListing from './DriverListing.js';

class SideBar extends Component {

    render() {
        let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
        let sidebarButton = this.props.isOpen ? 'sidebar-toggle open' : 'sidebar-toggle';
        return (
            <div className={sidebarClass}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Choose pick-up & drop off
                         </Accordion.Toggle>
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
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Choose cab
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body style={{ 'maxHeight': '70vh', 'overflowY': 'auto' }}>
                                <DriverListing 
                                    drivers={this.props.drivers} 
                                    showDriver={this.props.showDriver}
                                />
                            </Card.Body>
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
                <Button variant="light" onClick={this.props.toggleSidebar} className={sidebarButton}>></Button>
            </div>
        );
    }
}

export default SideBar;