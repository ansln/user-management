const express = require('express');
const mysql = require('mysql');
const md5 = require('blueimp-md5');
const dotenv = require('dotenv').config();

const authRouter = express.Router();

// connect to db
// const db = mysql.createConnection({
//     host: process.env.SQL_HOST,
//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE
// });

authRouter.get('/', (req, res) => {
    const userCookie = req.cookies;

    console.log(userCookie);
    
    if (!userCookie) {
        res.json({ user_auth_isLoggedIn: false });    
    } else {
        res.json({ user_auth_isLoggedIn: true }); 
    }
}); 

module.exports = authRouter;