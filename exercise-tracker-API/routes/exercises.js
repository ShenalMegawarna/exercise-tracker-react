const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//Get All Exercise
router.route("/").get((req, res) => {
    Exercise.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Create an Exercise
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ 
      username, 
      description, 
      duration, 
      date 
    });

    newExercise.save()
    .then((response) => {
      res.json("Exercise added!");
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one Exercise by Id
router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Find one Exercise by Id and delete
router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json('Exercise deleted.');
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

//Update an Exercise
router.route("/update/:id").put((req, res) => {
    Exercise.findById(req.params.id)
    .then(response=>{
        response.username = req.body.username;
        response.description = req.body.description;
        response.duration = Number(req.body.duration);
        response.date = Date.parse(req.body.date);
        
        response.save()
      .then(() => {
        res.json("Exercise updated!");
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
    }).catch((error) => {
        res.status(400).json("Error, no exercise found : " + error);
      });
    
  
      
  });

 

module.exports = router;
