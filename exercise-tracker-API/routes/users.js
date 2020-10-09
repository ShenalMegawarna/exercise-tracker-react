const router = require("express").Router();
let User = require("../models/user.model");


//Get All Users
router.route("/").get((req, res) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});


//Create a User
router.route("/add").post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});
    
    newUser.save()
      .then((response) => {
        res.json(('User added!'));
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  });

  module.exports = router;