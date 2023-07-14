const express = require("express");
const router = express.Router();
const Post = require("../models/Post");



//Get home page with all posts
router.get('', async (req, res) => {
    try {
      const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let perPage = 4;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      const count = await Post.count();
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

  //Get post
  router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
      res.render('post', { 
        locals,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  
  });
  

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "blog",
//       body: "Just testing things out",
//     },
//     {
//       title: "test",
//       body: "Just testing things out again",
//     },
//     {
//       title: "blog",
//       body: "Just testing things out",
//     },
//     {
//       title: "test",
//       body: "Just testing things out again",
//     },
//     {
//       title: "blog",
//       body: "Just testing things out",
//     },
//     {
//       title: "test",
//       body: "Just testing things out again",
//     },
//     {
//       title: "blog",
//       body: "Just testing things out",
//     },
//     {
//       title: "test",
//       body: "Just testing things out again",
//     },
//   ]);
// }

// insertPostData();

module.exports = router;
