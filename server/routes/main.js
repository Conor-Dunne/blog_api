const express = require('express');
const router = express.Router();
const Post = require("../models/Post");


router.get("/", async (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "A simple blog made with nodeJS"
    }

    try {
        const data =  await Post.find();
        res.render("index", {locals, data})
        console.log(data);
    } catch (error) {
        console.log(error);
    }

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