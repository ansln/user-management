const express = require('express');
const mysql = require('mysql');
const md5 = require('blueimp-md5');
const dotenv = require('dotenv').config();

const loginRouter = express.Router();

// connect to db
const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});


function generateString(length) {
    let result = '';
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function cookieVerify(req, res, next) {    
    next();
}   

loginRouter.post('/', cookieVerify, (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;
    const password = md5(pwd);
    // const randomCookies = 'hi_your_cookie_works_' + '_' + generateString(6) + '_' + Math.floor(Math.random() * 101) ;
    const randomCookies = 'hi_your_cookie_works';
    
    const checkUserQuery = 'SELECT * FROM data_admin WHERE admin_name = ? AND admin_password = ?';
    
    db.query(checkUserQuery, [username, password], (err, result) => {
        if (result == '') {
            res.json('user tidak ada');
        } else {
            res.cookie('LOGSESS_SISWA', randomCookies, {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            });
        
            res.json({ redirectUrl: '/home' });
        }
    });
});

module.exports = loginRouter;