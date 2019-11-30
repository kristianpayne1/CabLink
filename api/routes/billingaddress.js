const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('billing address index');
});

// gets all billing address
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Billing_Address;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get billing address by id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Billing_Address WHERE billingAddressID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a billing address by id 
router.post('/update/:id', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Billing_Address SET addressLine1='+req.body.addressLine1+
    ', addressLine2='+req.body.addressLine2+
    ', city='+req.body.city+
    ', county='+req.body.county+
    ', postcode='+req.body.postcode+
    ' WHERE billingAddressID='+req.params.id+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an cab company with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Billing_Address WHERE billingAddressID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Billing_Address (addressLine1, addressLine2, city, county, postcode) VALUES ('
        +req.body.addressLine1+', '+req.body.addressLine2+', '+req.body.city+', '+req.body.county+', '+req.body.postcode+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
