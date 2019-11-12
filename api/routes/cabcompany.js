var express = require('express');
var mysql = require('mysql');

var router = express.Router();

// get all cab companies (default)
router.get('/', function(req, res, next) {
    console.log('Hello');
    connection.query('SELECT * FROM c37_cablink.Cab_Company;', (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;