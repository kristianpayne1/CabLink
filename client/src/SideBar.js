import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class SideBar extends Component {
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
                            <Card.Body>This is where user will choose pickup/drop off locations and time</Card.Body>
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