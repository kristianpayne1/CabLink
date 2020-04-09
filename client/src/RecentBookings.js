import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

// Returns an Accordion containing all of the users recent bookings
class RecentBookings extends Component{
    state = {
        bookingsFound: [],
        driver: [],
        driverName: "",
        driverList: [],
        bookings: []
    }

    // Get bookings corresponding to the active user
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

    // Get the first and last name of the corresponding driver
    getDriverName= async (callback, booking) => {
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
            callback(driverName);
        }).catch(err => {
          console.log('caught it!', err);
        })
    }

    // Get all drivers
    getDrivers(){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+'/driver/get', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({driverList: data});
        })
    }

    // Load all bookings into Cards to be placed within the accordion
    loadBookings(){
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
            } else {
                for(let x = 0; x < this.state.bookingsFound.length; x++){
                    let dateTime = this.state.bookingsFound[x].departureDateTime;
                    let time = dateTime.slice(0,19).replace('T',' ').split(/[- :]/);
                    let departureDate = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
                    let self = this;
                    this.getDriverName(function (driverName) {
                        bookings.push(<Card key={x}>
                            <Accordion.Toggle as={Card.Header} eventKey={x}>
                                {departureDate.toDateString() + " "}@{" " + departureDate.getHours() + ':' + departureDate.getMinutes() + ':' + departureDate.getSeconds()}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={x}>
                                <Card.Body>
                                    Your Booking cost you £{self.state.bookingsFound[x].price}
                                    <br/>
                                    Your Driver was {driverName}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>);
                    }, this.state.bookingsFound[x]);
                }
            }
            this.setState({bookings: bookings});
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
            this.setState({bookings: bookings});
        }
    }

    // Forces the component to update upon first render
    componentDidMount(){
        this.getBookings();
    }

    render(){
        let bookings = this.state.bookings;
        return(
            <div style={{'maxHeight': '64vh', 'overflowY': 'auto'}}>
                <Accordion defaultActiveKey={0}>
                    {bookings}
                </Accordion>
            </div>
        );
    }
}

export default RecentBookings;