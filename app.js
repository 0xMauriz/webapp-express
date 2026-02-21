const express = require('express');
const app = express();
const port = 3000;
const movieRouter = require('./router/movieRouter.js')
const connection = require("./data/moviesData.js");

app.use(express.static("./public/imgs"));


app.use(express.json());


app.use('/', movieRouter)


app.listen(port, () => {
    console.log(`In ascolto sulla porta ${port}`);
})