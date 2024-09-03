const express = require('express');
const mysql = require('mysql');
const md5 = require('blueimp-md5');
const dotenv = require('dotenv').config();

const logoutRouter = express.Router();

// connect to db
const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

logoutRouter.get('/', (req, res) => {
    res.cookie('logsess_siswa', '', {
        expires: new Date(0),
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });
    res.json({ redirectUrl: '/' });
});

module.exports = logoutRouter;