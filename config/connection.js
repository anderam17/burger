var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "burgers_db"
  });

}

// establish connection
connection.connect(function(err) {
  if(err) {
    console.error(`error connecting ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

//export connection for ORM to use 
module.exports = connection;



