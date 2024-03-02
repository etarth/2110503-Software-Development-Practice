const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Earthz@34',
    database: 'vacCenter'
});

module.exports = connection;