require('dotenv').config()
const cors = require('cors')
const express  = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();

const host = '192.168.43.70';
const port = 3062;

app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

app.get('/', (req, res) =>{
    return res.json("Hello I Am From Backend")
    return res.json(data), res.status(200);
})

app.put('/updateappbuka/:id/:jedabuka', (req, res) => {
    const { id, jedabuka } = req.params;

    const sql = `UPDATE autofeeder SET jedabuka=${jedabuka} WHERE id=${id}`;
    db.query(sql, (err, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Data berhasil diperbarui" });
    });
});

const users = require('./routes/users');
app.use('/users', users)

// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { jedabuka, waktuMakan } = req.body;

//     const sql = `UPDATE autofeeder SET jedabuka=${jedabuka}, waktuMakan= ${waktuMakan} WHERE id =${id}`;
//         db.query(sql, (err, fields) => {
//             console.log(fields)
//         })
// });

app.listen(port, host, () => {
    console.log(`SERVER RUNNING IN YOUR MOTHER FUCKING PC !!!! running on = ${host}:${port}`)
}) 