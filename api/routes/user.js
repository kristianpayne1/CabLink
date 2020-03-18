const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('user index');
});

// gets all user
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.User;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get user by id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.User WHERE userID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get users id by their email
router.get('/get/id/:email', function(req, res, next) {
  mysqlconnection.query('SELECT userID FROM c37_cablink.User WHERE email = "'+req.params.email+'";', (error, results) => {
      if(error) throw error;
      res.send(results);
  })
})

// get user and their corresponding account by email
router.get('/get/email/:email', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.User INNER JOIN c37_cablink.Account ON User.userID=Account.userID WHERE email = "'+req.params.email+'";', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a user by id 
router.post('/update/:id', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.User SET firstname='+req.body.firstname+
    ', lastname='+req.body.lastname+
    ', email='+req.body.email+
    ', mobileNo='+req.body.email+
    ', userType='+req.body.userType+
    ' WHERE userID='+req.params.id+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an user with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.User WHERE userID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

//get all the payment details for a user
router.get('/get/paymentdetails/:id', function(req, res, next) {
  mysqlconnection.query('SELECT Payment_Details.*, Billing_Address.* FROM c37_cablink.User INNER JOIN c37_cablink.Account ON Account.userID = User.userID INNER JOIN c37_cablink.Payment_Details ON Payment_Details.accountID = Account.accountID INNER JOIN c37_cablink.Billing_Address ON Billing_Address.billingAddressID = Payment_Details.billingAddressID WHERE User.userID = '+req.params.id+';', function(error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
})

//make a new user
router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.User (firstname, lastname, email, mobileNo, userType) VALUES ("'
        +req.body.firstName+'", "'+req.body.lastName+'", "'+req.body.email+'", "'+req.body.mobileNo+'", "'+req.body.userType+'");', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
