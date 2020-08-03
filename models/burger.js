var orm = require("../config/orm.js");

//feeding orm information specific to the burgers DB
var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  //cols and vals are arrays
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

//Export the database functions fo the controller (burgersController.js)
module.exports = burger;