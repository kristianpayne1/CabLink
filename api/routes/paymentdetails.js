const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('payment details index');
});

// gets all payment details
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Payment_Details;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get payment details by account id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Payment_Details WHERE accountID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// delete a payment detail with given id and card no
// Change to accept id through req.body
router.get('/delete/:id/:cardNo', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Payment_Details WHERE accountID = '+req.params.id+' AND cardNo = '+req.params.cardNo+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Payment_Details (accountID, cardNo, sortCode, securityCode, cardHolderName, billingAddressID) VALUES ('
        +req.body.accountID+', '+req.body.cardNo+', '+req.body.sortCode+', '+req.body.securityCode+', '+req.body.cardHolderName+', '+req.body.billingAddressID+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
