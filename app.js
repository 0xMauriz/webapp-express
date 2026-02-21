const express = require('express');
const app = express();
const port = 3000;
const movieRouter = require('./router/movieRouter.js')
const connection = require("./data/moviesData.js");

app.use(express.static("public"));

function index(req, res) {
    const sql = 'SELECT * FROM `movies`';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

    return sql;
}

function destroy(req, res) {

    const { title } = req.params

    const sqlDestroy = 'DELETE FROM `movies` WHERE title = ?';

    connection.query(sqlDestroy, [title], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

}

function show(req, res) {

    const { title, abstract } = req.params

    const sqlShow = 'SELECT `movies`.`title`,`movies`.`abstract` FROM `movies` WHERE title = ?';
    connection.query(sqlShow, [title, abstract], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed frfr" });
        if (results.length === 0) return res.status(404).json({ error: "Movies not found" });
        res.json(results[0]);

        return sqlShow;
    })
}


app.use(express.json());

app.use('/', movieRouter)

app.listen(port, () => {
    console.log(`In ascolto sulla porta ${port}`);
})