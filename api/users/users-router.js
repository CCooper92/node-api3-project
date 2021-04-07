const express = require('express');
const Users = require('./users-model.js')
const Posts = require('./../posts/posts-model.js')
const mw = require("../middleware/middleware.js")
const router = express.Router();
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

//working
router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(error);
    res.status(500).json({
      message: " Error retrieving user"
    })
  })
});

//working
router.get('/:id', mw.validateUserId,  (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});


router.post('/',mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({message: "missing required name field"})
  })
});


router.put('/:id', mw.validateUserId, mw.validateUser,(req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, red.body)
  .then(user=> {
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({message:"The User can not be found"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "error updating user"})
  })
});

//WORKING
router.delete('/:id', mw.validateUserId,(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json({message: "user removed"})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "Error removing User"})
  })
});



router.get('/:id/posts',mw.validateUserId,   (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.getById(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
 .catch(error => {
   res.status(500).json({ message:"error getting posts"})
 })
});



router.post('/:id/posts',mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({message: "Error getting the post from user"})
  })
});

// do not forget to export the router

module.exports = router;