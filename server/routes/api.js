const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

router.get("/posts", async (req, res) => {



    try {
        const data =  await Post.find();
        res.json(data)
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;