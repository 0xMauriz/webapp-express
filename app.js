const connection = require('./data/moviesData.js');
const express = require('express');
const app = express();
const port = 3000;

function index(req, res) {
    const sql = 'SELECT * FROM `movies`';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

    return sql;
}

function destroy(req, res) {

}

// function show

app.use(express.json());

app.get('/', index);

app.listen(port, () => {
    console.log(`In ascolto sulla porta ${port}`);
})