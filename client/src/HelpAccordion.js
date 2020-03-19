import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// For viewing quesions in help page
class HomeAccordion extends Component {
    state = {
        questions: []
    };

    // call database a retreive all questions that have been asnwered.
    callAPI() {
        let self = this;

        fetch(process.env.REACT_APP_SERVER + '/question/get', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();
        }).then(function (data) {
            self.setState({ questions: data }, function () {
                this.listQuestions();
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    };

    // call api when component loads
    componentDidMount() {
        this.callAPI();
    }

    // lists all the questions retreived from the database as accordians
    listQuestions = () => {
        return (
            this.state.questions.map(question =>
                <Accordion id="accordion" key={question.questionID}>
                    <Card>
                        <Accordion.Toggle eventKey="0" id="head">{question.question}</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"><Card.Body id="body">{question.answer}</Card.Body></Accordion.Collapse>
                    </Card>
                </Accordion>
            )
        )
    }

    render() {
        return (
            <div id="container">
                <p>Below are some common questions asked that should provide you answers to questions that you have!</p>
                {this.listQuestions()}
                <p><b>If your question isn't answered above then please send us your question below and we will respond as soon as possible!</b></p>

                <Form id="form">
                    <Form.Group>
                        <Form.Control as="textarea" maxLength="150" rows="4" placeholder="Enter question here..." id="questionfield" />
                        <Form.Text className="text-muted">150 Character Limit</Form.Text>
                        <Form.Control type="email" placeholder="Email Address" id="emailfield" />

                    </Form.Group>
                    <Button variant="primary" type="submit" id="formbutton">Submit</Button>
                </Form>

            </div>
        );
    }
}
export default HomeAccordion;