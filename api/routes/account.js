const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
  res.send('account index');
});

// gets all account
router.get('/get', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Account;', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// get account by id
router.get('/get/:id', function(req, res, next) {
  mysqlconnection.query('SELECT * FROM c37_cablink.Account WHERE accountID = '+req.params.id+';', (error, results) => {
      if(error) throw error;
      res.send(results);
  });
});

// update a account by id 
router.post('/update/:id', function(req, res, next) {
  mysqlconnection.query(
    'UPDATE c37_cablink.Account SET password='+req.body.password+
    ', lastLogin='+req.body.lastLogin+
    ' WHERE accountID='+req.params.id+';', 
  function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});

// delete an account with given id
// Change to accept id through req.body
router.get('/delete/:id', function(req, res, next) {
  mysqlconnection.query('DELETE FROM c37_cablink.Account WHERE accountID = '+req.params.id+';', function (error, results) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/new', function(req, res, next) {
    mysqlconnection.query(
        'INSERT INTO c37_cablink.Account (userID, password, lastLogin) VALUES ('
        +req.body.userID+', "'+req.body.regPassword+'", "'+req.body.lastLogin+'");', (error, results) => {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
});

module.exports = router;
