import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './HelpAccordion.css';

class HomeAccordion extends Component {
    render() {
        return(
            <div id="container">
                <p>Below are some common questions asked that should provide you answers to questions that you have!</p>

                <Accordion id="accordion">
                    <Card>
                        <Accordion.Toggle eventKey="0" id="head">Do I have to create an account in order to book a cab?</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"><Card.Body id="body">You don't have to create an account in order to book a cab!</Card.Body></Accordion.Collapse>
                    </Card>
                </Accordion>

                <Accordion id="accordion">
                    <Card>
                        <Accordion.Toggle eventKey="0" id="head">My cab hasn't arrived, what do I do?</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"><Card.Body id="body">If your cab hasn't arrived then the best way to resolve this issue would be to contact the contact number on the booking!</Card.Body></Accordion.Collapse>
                    </Card>
                </Accordion>

                <Accordion id="accordion">
                    <Card>
                        <Accordion.Toggle eventKey="0" id="head">Can I save payment information to my account?</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"><Card.Body id="body">Yes you can, you're also able to remove the saved methods from your account at any time!</Card.Body></Accordion.Collapse>
                    </Card>
                </Accordion>

                <p>If your question isn't answered above then please send us your question below and we will respond as soon as possible!</p>

                <Form id="form">
                    <Form.Group>
                        <Form.Control as="textarea" rows="4" placeholder="Enter question here..." id="questionfield"/>
                        <Form.Control type="email" placeholder="Email Address" id="emailfield"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" id="formbutton">submit</Button>
                </Form>
                
            </div>
        );

    }
}
export default HomeAccordion;