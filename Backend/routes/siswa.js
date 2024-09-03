const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv').config();

const siswaRouter = express.Router();

// connect to db
const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

const user_auth = async (req, res, next) => {
    const { key } = req.query;
    const default_auth_key = process.env.AUTH_KEY

    if (!key) {
        res.status(403).json('Missing Authorization!');
    } else {
        key != default_auth_key ? res.status(403).json('Key not valid!') : next();
    }
}

// show semua siswa
siswaRouter.get('/', (req, res) => {
    const query = 'SELECT * FROM data_siswa';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// show siswa dengan id
siswaRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM data_siswa WHERE id = ' + id;
    db.query(query, (err, results) => {
        if (!results.length) {
            res.status(200).json({ msg: 'not found' });
        }else{
            res.json(results);
        }
    });
});

// add siswa
siswaRouter.post('/', (req, res) => {
    const { nama, kelas, nilai } = req.body;
    const query = 'INSERT INTO data_siswa VALUES (NULL, ?, ?, ?)';
    db.query(query, [nama, kelas, nilai], (err, result) => {
        if (err) throw err;
        res.send('Siswa berhasil ditambah');
    });
});

// update siswa
siswaRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { nama, kelas, nilai} = req.body
    const getUserSQL = 'SELECT * FROM data_siswa WHERE id = ?'

    db.query(getUserSQL, [id], (err, results) => {            
        if (results.length <= 0) {
            return res.status(404).send('Siswa tidak ditemukan')
        }else{
            const dataRes = results[0]
            const dataNama = nama || dataRes.nama_siswa
            const dataKelas = kelas || dataRes.kelas
            const dataNilai = nilai || dataRes.nilai
    
            const updateDataQuery = 'UPDATE data_siswa SET nama_siswa = ?, kelas = ?, nilai = ? WHERE id = ?'
            db.query(updateDataQuery, [dataNama, dataKelas, dataNilai, id], (err, results) => {
                if (err) throw err
    
                res.send(`Data siswa dengan Id: ${id} berhasil diubah`)
            });

        }
    });
});

// delete siswa
siswaRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM data_siswa WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Siswa ' + id + ' berhasil dihapus');
    }); 
});

module.exports = siswaRouter;