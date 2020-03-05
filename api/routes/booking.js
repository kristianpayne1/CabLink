const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function (req, res, next) {
  res.send('booking index');
});

// gets all booking
router.get('/get', function (req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Booking;', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// get booking by booking id
router.get('/get/:id', function (req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Booking WHERE bookingID = ' + req.params.id + ';', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// get booking by booking id
router.get('/get/pickup/:id', function (req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Booking INNER JOIN c37_cablink.Driver ON Driver.driverID = Booking.driverID INNER JOIN c37_cablink.Route ON Route.routeID=Booking.routeID INNER JOIN c37_cablink.Cab_Company ON Cab_Company.companyID = Driver.companyID INNER JOIN c37_cablink.Car ON Car.driverID = Driver.driverID WHERE bookingID = ' + req.params.id + ';', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// update a booking by id 
router.post('/update/:id', function (req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Driver SET driverID=' + req.body.driverID +
    ', userID=' + req.body.userID +
    ', departureLong=' + req.body.departureLong +
    ', departureLat=' + req.body.departureLat +
    ', destinationLong=' + req.body.destinationLong +
    ', destinationLat=' + req.body.destinationLat +
    ', departureTime=' + req.body.departureTime +
    ', price=' + req.body.price +
    ', complete=' + req.body.complete +
    ' WHERE bookingID=' + req.params.id + ';',
    function (error, results) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

// delete a booking with given id
// Change to accept id through req.body
router.get('/delete/:id', function (req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Booking WHERE bookingID = ' + req.params.id + ';', function (error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});


router.post('/new', function (req, res, next) {
  mysqlconnection.query(
    'INSERT INTO c37_cablink.Booking (driverID, userID, routeID, departureDateTime, noPassangers, luggage, disabled, price, complete) VALUES ('
    + req.body.driverID + ', ' + req.body.userID + ', ' + req.body.routeID + ', "' + req.body.departureDateTime + '", ' + req.body.noPassangers + ', ' + req.body.luggage + ', ' + req.body.disabled + ', ' + req.body.price + ', ' + req.body.complete + ');', (error, results) => {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

module.exports = router;
