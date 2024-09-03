const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sdb_siswa'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;