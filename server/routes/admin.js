const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

const adminLayout = '../views/layouts/admin';

//Get admin login page
router.get('/login', async (req, res) => {

  try {

    const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
    
   
    res.render('admin/login', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;