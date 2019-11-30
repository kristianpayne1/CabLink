const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('billing address index');
});

// gets all car
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Car;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get car by driver id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Car WHERE driverID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get car by registration 
router.get('/get/:reg', function(req, res, next) {
    mysqlconnection.query('SELECT * FROM c37_cablink.Car WHERE registrationNo = '+req.params.reg+';', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
  });

// update a car by registration 
router.post('/update/:reg', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Driver SET driverID='+req.body.driverID+
    ', registrationNo='+req.body.registrationNo+
    ', colour='+req.body.colour+
    ', make='+req.body.make+
    ', model='+req.body.model+
    ' WHERE registrationNo='+req.params.reg+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an driver with given id and registrationNo
// Change to accept id through req.body
router.get('/delete/:id/:reg', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Car WHERE driverID = '+req.params.id+' AND registrationNo = '+req.params.reg+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Car (driverID, registrationNo, colour, make, model) VALUES ('
        +req.body.driverID+', '+req.body.registrationNo+', '+req.body.colour+', '+req.body.make+', '+req.body.model+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
