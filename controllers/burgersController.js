var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//! CHANGE NAME SLEEPY
router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgerss/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
//! SLEEPY AGAIN --> DEVOWERED?
  burger.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  //.delete(condition, function(result) {
    // if res
  // })
  burger.delete(condition, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  })
})

// Export routes for server.js to use.
module.exports = router;
