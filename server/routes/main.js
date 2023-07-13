const express = require('express');
const router = express.Router();
const Post = require("../models/Post");


router.get("/", (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "A simple blog made with nodeJS"
    }

    res.render("index", locals);
})

// function insertPostData () {
//       Post.insertMany([
//         {
//           title: "blog",
//           body: "Just testing things out"
//         },
//         {
//             title: "test",
//             body: "Just testing things out again"
//           },
//     ])
// }

// insertPostData();


module.exports = router;