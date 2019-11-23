const express = require('express');
const mysqlconnection = require('../connection');
const router = express.Router();


//default 
router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

// gets all accounts
router.get('/accounts', function(req, res, next) {

    mysqlconnection.query('SELECT * FROM c37_cablink.Account;', (error, results) => {
        if(error) throw error;
        res.send(results);
    });
});

// delete an account with given id
// Change to accept id through req.body
router.get('/accounts/delete/:id', function(req, res, next) {
    connection.query('DELETE FROM c37_cablink.Account WHERE accountID = '+req.params.id+'', function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

// example of creating a new user 
// can't test without front-end since using POST

// router.post('/accounts/new', function(req, res, next) {
//     connection.query(
//         'INSERT INTO c37_cablink.User (firstname, lastname, email, mobileNo, userType) VALUES ('
//         +req.body.firstname+', '+req.body.lastname+', '+req.body.email+', '+req.body.mobileNo+', '+req.body.userType+');', (error, results) => {
//             if(error) throw error;
//             res.send(JSON.stringify(results));
//         });
// });

module.exports = router;