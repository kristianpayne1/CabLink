const express = require('express');
const router = express.Router();
const mysqlconnection = require('../connection');

/* Default. */
router.get('/', function(req, res, next) {
    res.send('question index');
  });
  
  // gets all payment details
  router.get('/get', function(req, res, next) {
    mysqlconnection.query('SELECT * FROM c37_cablink.Question;', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
  });
  
  // get question by question id
  router.get('/get/:id', function(req, res, next) {
    mysqlconnection.query('SELECT * FROM c37_cablink.Question WHERE questionID = '+req.params.id+';', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
  });
  
  // delete a question with given id
  router.get('/delete/:id', function(req, res, next) {
    mysqlconnection.query('DELETE FROM c37_cablink.Question WHERE questionID = '+req.params.id+';', function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
  });
  
  
  router.post('/new', function(req, res, next) {
      mysqlconnection.query(
          'INSERT INTO c37_cablink.Question (questionID, question, answer, date, email) VALUES ('
          +req.body.questionID+', '+req.body.question+', '+req.body.answer+', '+req.body.date+', '+req.body.email+');', (error, results) => {
              if(error) throw error;
              res.send(JSON.stringify(results));
          });
  });

module.exports = router;
