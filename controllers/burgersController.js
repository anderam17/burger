var express = require("express");

var router = express.Router();

// import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  //! WHERE DOES DATA COME FROM?
  burger.all(function (data) {
    var hbsObject = {
      burgers: data,
    };
    // !console.log(hbsObject);
    //render handlebars page with burgers data saved in hbsObject
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create(
    ["name", "devoured"],
    [req.body.name, req.body.devoured],
    function (result) {
      //send back id of new burger
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;


  burger.update({devoured: req.body.devoured}, condition, function(result) {
    if(result.changedRows == 0) {
      //if no rows were changed, then the ID must not exist 
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if(result.affectedRows == 0) {
      //if no rows were changed, then the ID must not exist 
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;