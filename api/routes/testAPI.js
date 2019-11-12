const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
    host: 'dragon',
    user: 'c37_cablink',
    password: 'wlindl!',
    database: 'c37_cablink'
});

connection.connect(error => {
    if(error)
    {
        return error;
    }else{
        console.log('Database connection successful');
    }
});

//default 
router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

// gets all accounts
router.get('/accounts', function(req, res, next) {

    connection.query('SELECT * FROM c37_cablink.Account;', (error, results) => {
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

// router.post('/users/new', function(req, res, next) {
//     connection.query(
//         'INSERT INTO c37_cablink.User (firstname, lastname, email, mobileNo, userType) VALUES ('
//         +req.body.firstname+', '+req.body.lastname+', '+req.body.email+', '+req.body.mobileNo+', '+req.body.userType+');', (error, results) => {
//             if(error) throw error;
//             res.send(JSON.stringify(results));
//         });
// });

module.exports = router;