const connection = require("../data/moviesData.js");


function index(req, res) {
    const sql = 'SELECT * FROM `movies`';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

    return sql;
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

function store(req, res) {

    res.send(req.bod);

    const newId = posts[posts.length - 1].id + 1;

    const newPost = {

        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);

    console.log(posts);

    res.status(201);
    res.json(posts);


}

function update(req, res) {

    const id = Number(req.params.id)

    const singlePost = posts.find((post) => post.id === id);

    if (!singlePost) {
        res.status(404)

        return res.json({
            status: 404,
            error: 'Not found',
            message: 'Il post non esiste'
        })
    }


    singlePost.title = req.body.title;
    singlePost.content = req.body.content;
    singlePost.image = req.body.image;
    singlePost.tags = req.body.tags;

    res.json(singlePost)

}

function destroy(req, res) {

    const { title } = req.params

    const sqlDestroy = 'DELETE FROM `movies` WHERE title = ?';

    connection.query(sqlDestroy, [title], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

}

module.exports = { index, show, store, update, destroy }