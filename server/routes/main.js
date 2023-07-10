const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {

    const locals = {
        title: "NodeJS Blog",
        description: "A simple blog made with nodeJS"
    }

    res.render("index", locals);
})


module.exports = router;