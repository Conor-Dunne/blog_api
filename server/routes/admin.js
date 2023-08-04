const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";

//Check login middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

//Get admin login page
router.get("/login", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("admin/login", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

//POST check login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin/dashboard");
  } catch (error) {}
});

//GET dashbord

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Simple Blog",
    };

    const data = await Post.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add post",
      description: "Simple Blog",
    };

    const data = await Post.find();
    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

//POST add new post
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
      });

      await Post.create(newPost);
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

//GET edit post
router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Edit post",
      description: "Simple Blog",
    };

    const data = await Post.findById(req.params.id);
    res.render("admin/edit-post", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

//PUT edit post
router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      bosy: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/admin/dashboard`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/')
})



module.exports = router;

//Post register new admin
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(username);
//     try {
//       const user = await User.create({ username, password: hashedPassword });
//       res.status(201).json({ message: "User Created", user });
//     } catch (error) {
//       if (error.code === 11000) {
//         res.status(409).json({ message: "User already in use" });
//       }
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
