require('dotenv').config()

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM autofeeder";
    connection.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(data);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM autofeeder WHERE id = ?";
    connection.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(data);
    });
});

router.put('/waktumakan/:id/:waktuMakan', (req, res) => {
    const { id, waktuMakan } = req.params;

    const sql = `UPDATE autofeeder SET waktuMakan= ${waktuMakan} WHERE id=${id}`;
    db.query(sql, (err, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Data berhasil diperbarui" });
    });
});

router.put('/jedabuka/:id/:jedabuka', (req, res) => {
    const { id, jedabuka } = req.params;

    const sql = `UPDATE autofeeder SET jedabuka=${jedabuka} WHERE id=${id}`;
    db.query(sql, (err, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Data berhasil diperbarui" });
    });
});

router.put('/updatedht/:id/:suhu/:kelembapan', (req, res) => {
    const { id, suhu, kelembapan } = req.params;

    const sql = `UPDATE autofeeder SET suhu=${suhu}, kelembapan=${kelembapan} WHERE id=${id}`;
    db.query(sql, (err, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Data berhasil diperbarui" });
    });
});

//     try {
//         res.status(200).json({ message: "Data berhasil diperbarui" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
//});

module.exports = router;
