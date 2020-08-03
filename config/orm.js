// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax to create ? for sql syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i=0; i < num; i++){
    arr.push("?");
  }
  return arr.toString();
}

//helper function to convert object key/value pairs to sql syntax
function objToSql(ob){
var arr = [];

//loop through keys and push the key/value as a string int arr
for (var key in ob) {
var value = ob[key];
// check to skip hidden properties
if (Object.hasOwnProperty.call(ob, key)) {
  //if string with spaces, add quotations (Allana Anderson --> "Allana Anderson")
  if (typeof value === "string" && value.indexOf(" ") >= 0) {
    value = `'${value}'`;
  }
  //concats key value pair in sql syntax in an array
  //eg {name: 'Allana Anderson'} => [name='Allana Anderson'];
  arr.push(`${key}=${value}`);
}
}
return arr.toString();
}

//Object for all SQL statement functions
var orm = {

  all: function(tableInput, cb) {
    var queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create: function(table, cols, vals, cb) {
    var queryString = `INSERT INTO ${table}`;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    //! console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  update: function(table, objColVals, condition, cb) {
    var queryString = `UPDATE ${table}`;

    queryString = `SET ${objToSql(objColVals)} WHERE ${condition}`;

        //! console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;

