require('dotenv').config();

const express = require('express');
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = 3000 || process.env.PORT

app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
    console.log(`Blog app is listening on port ${PORT}`)
})