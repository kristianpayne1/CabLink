import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

class RecentBookings extends Component{
    
    state = {
        bookingsFound: [],
        driver: [],
        driverName: "",
        bookings: []
    }

    getBookings(){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+'/booking/get/user/'+this.props.activeUser.userID, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
          self.setState({bookingsFound: data});
          self.loadBookings();
        }).catch(err => {
          console.log('caught it!', err);
        })
    }

    getDriverName(booking){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+'/driver/get/'+booking.driverID, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
            self.setState({driver: data});
            let driverName = self.state.driver[0].firstname + " " + self.state.driver[0].lastname;
            self.setState({driverName: driverName});
        }).catch(err => {
          console.log('caught it!', err);
        })
        return self.state.driverName;
    }

    loadBookings(){
        this.getBookings();
        let bookings = [];
        if(this.state.bookingsFound !== null){
            if(this.state.bookingsFound.length === 0){
                bookings.push(<Card>
                    <Accordion.Toggle as={Card.Header} eventKey={0}>
                        No Booking Found
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={0}>
                        <Card.Body>
                            No bookings were found. Make one!
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>);
            }
            for(let x = 0; x < this.state.bookingsFound.length; x++){
                bookings.push(<Card>
                    <Accordion.Toggle as={Card.Header} eventKey={x}>
                        Booking: {x+1}:{" "}
                        {this.state.bookingsFound[x].departureDateTime}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={x}>
                        <Card.Body>
                            Your Booking cost you £{this.state.bookingsFound[x].price}
                            <br/>
                            Your Driver was {this.getDriverName(this.state.bookingsFound[x])}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>);
            }
            return bookings;
        } else {
            bookings.push(<Card>
                <Accordion.Toggle as={Card.Header} eventKey={0}>
                    No Booking Found
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                        No bookings were found. Make one!
                    </Card.Body>
                </Accordion.Collapse>
            </Card>);
            return bookings;
        }
    }

    componentDidMount(){
        let bookings = this.loadBookings();
        this.setState({bookings: bookings});
    }

    render(){
        let bookings = this.state.bookings;
        return(
            <Accordion>
                {bookings}
            </Accordion>
        );
    }
}

export default RecentBookings;