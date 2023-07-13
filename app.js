require('dotenv').config();

const express = require('express');
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db")

const app = express();
const PORT = 3000 || process.env.PORT



//connect to DB
connectDB();

app.use(express.static('public'));

//Templating Engine
// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use("/", require("./server/routes/main"));

// API routes
app.use("/api", require("./server/routes/api"));

app.listen(PORT, () => {
    console.log(`Blog app is listening on port ${PORT}`)
})