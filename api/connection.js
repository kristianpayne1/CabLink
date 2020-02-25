const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'dragon',
    user: 'c37_cablink',
    password: 'fthundt',
    database: 'c37_cablink'
  });
  
  connection.connect(error => {
    console.log('Connecting to database...');
    if(error)
    {
        return error;
    }else{
        console.log('Database connection successful');
    }
  });

  module.exports = connection;