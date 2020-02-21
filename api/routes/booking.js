const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('billing address index');
});

// gets all booking
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Booking;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get car by booking id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Booking WHERE bookingID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a car by registration 
router.post('/update/:id', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Driver SET driverID='+req.body.driverID+
    ', userID='+req.body.userID+
    ', departureLong='+req.body.departureLong+
    ', departureLat='+req.body.departureLat+
    ', destinationLong='+req.body.destinationLong+
    ', destinationLat='+req.body.destinationLat+
    ', departureTime='+req.body.departureTime+
    ', price='+req.body.price+
    ' WHERE bookingID='+req.params.id+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete a booking with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Booking WHERE bookingID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Booking (driverID, userID, departureLong, departureLat, destinationLong, destinationLat, departureTime, price) VALUES ('
        +req.body.driverID+', '+req.body.userID+', '+req.body.departureLong+', '+req.body.departureLat+', '+req.body.destinationLong+', '+req.body.destinationLat+', '+req.body.departureTime+', '+req.body.price+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
