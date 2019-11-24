const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('cab companies index');
});

// gets all cab companies
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Cab_Company;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get user by id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Cab_Company WHERE companyID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a cab company by id 
router.post('/update', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Cab_Company SET companyName='+req.body.companyName+
    ', phoneNo='+req.body.phoneNo+
    ' WHERE companyID='+req.params.companyID+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an cab company with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Cab_Company WHERE companyID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Cab_Company (companyName, phoneNo) VALUES ('
        +req.body.companyName+', '+req.body.phoneNo+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
