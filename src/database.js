const mysql = require('mysql');
const { promisify } = require('util');

// importar database
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MAY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUESED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify in callquery
pool.query = promisify(pool.query);

module.exports = pool;  
