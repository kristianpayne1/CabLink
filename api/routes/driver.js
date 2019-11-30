const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('billing address index');
});

// gets all driver
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Driver;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get driver by id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Driver WHERE driverID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a driver by id 
router.post('/update/:id', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Driver SET firstname='+req.body.firstname+
    ', lastname='+req.body.lastname+
    ', mobileNo='+req.body.mobileNo+
    ', companyID='+req.body.companyID+
    ', currentLat='+req.body.currentLat+
    ', currentLong='+req.body.currentLong+
    ' WHERE driverID='+req.params.id+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an driver with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Driver WHERE driverID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Driver (firstname, lastname, mobileNo, compnayID, currentLat, currentLong) VALUES ('
        +req.body.firstname+', '+req.body.lastname+', '+req.body.mobileNo+', '+req.body.companyID+', '+req.body.currentLat+', '+req.body.currentLong+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
