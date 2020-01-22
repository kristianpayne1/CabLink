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

router.get('/get/:email', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.User INNER JOIN c37_cablink.Account ON User.userID=Account.userID WHERE email = '+req.params.email+';', (error, results) => {
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


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.User (firstname, lastname, email, mobileNo, userType) VALUES ('
        +req.body.firstname+', '+req.body.lastname+', '+req.body.email+', '+req.body.mobileNo+', '+req.body.userType+');', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
