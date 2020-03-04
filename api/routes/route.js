const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
    res.send('route index');
  });
  
  // gets all routes
  router.get('/get', function(req, res, next) {
    mysqlconnection.query('SELECT * FROM c37_cablink.Route;', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
  });
  
  // get route by route id
  router.get('/get/:id', function(req, res, next) {
    mysqlconnection.query('SELECT * FROM c37_cablink.Route WHERE routeID = '+req.params.id+';', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
  });
  
  // update a route by id 
  router.post('/update/:id', function(req, res, next) {
    mysqlconnection.query(
      'UPDATE c37_cablink.Route SET' +
      ', departureLat='+req.body.departureLong+
      ', departureLong='+req.body.departureLong+
      ', extraStop1Lat='+req.body.departureLat+
      ', extraStop1Long='+req.body.departureLat+
      ', extraStop2Lat='+req.body.departureLat+
      ', extraStop2Long='+req.body.departureLat+
      ', extraStop3Lat='+req.body.departureLat+
      ', extraStop3Long='+req.body.departureLat+
      ', destinationLat='+req.body.destinationLat+
      ', destinationLong='+req.body.destinationLong+
      ' WHERE routeID='+req.params.id+';', 
    function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
    });
  });
  
  // delete a route with given id
  // Change to accept id through req.body
  router.get('/delete/:id', function(req, res, next) {
    mysqlconnection.query('DELETE FROM c37_cablink.Route WHERE routeID = '+req.params.id+';', function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
  });
  
  
  router.post('/new', function(req, res, next) {
      mysqlconnection.query(
          'INSERT INTO c37_cablink.Route (departureLat, departureLong, extraStop1Lat, extraStop1Long, extraStop2Lat, extraStop2Long, extraStop3Lat, extraStop3Long, destinationLat, destinationLong) VALUES ('
          +req.body.departureLat+', '+req.body.departureLong+', '+req.body.extraStop1Lat+', '+req.body.extraStop1Long+', '+req.body.extraStop2Lat+', '+req.body.extraStop2Long+', '+req.body.extraStop3Lat+', '+req.body.extraStop3Long+', '+req.body.destinationLat+', '+req.body.destinationLong+');', (error, results) => {
              if(error) throw error;
              res.send(JSON.stringify(results));
          });
  });
  
  module.exports = router;
  