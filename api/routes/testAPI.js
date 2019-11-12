var express = require('express');
var mysql = require('mysql');

var router = express.Router();

const connection = mysql.createConnection({
    host: 'dragon',
    user: 'c37_cablink',
    password: 'wlindl!',
    database: 'c37_cablink'
});

connection.connect(err => {
    if(err)
    {
        return err;
    }else{
        console.log('Database connection successful');
    }
});

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/accounts', function(req, res, next) {

    connection.query('SELECT * FROM c37_cablink.Account;', (err, results) => {
        if(err) throw err;
        res.send(results);
    });

});

module.exports = router;