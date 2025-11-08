const express = require("express");
const nodeapp = express();
var bodyParser = require('body-parser');
const userRoutes = require("./api/routes/user");
const equipmentsRoutes = require("./api/routes/equipments");
const requestsRoutes = require("./api/routes/requests");

//const dbConfig = require('./db.config.js');

 //Connecting to the database
 // app.js
    const db = require('./dbconfig.js'); // Import the connection pool

    // Example with parameterized queries to prevent SQL injection
    // const userId = 1;
    // db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
    //   if (error) {
    //     console.error('Error executing parameterized query:', error);
    //     return;
    //   }
    //   console.log('User with ID 1:', results);
    // });




nodeapp.use(express.json());
nodeapp.use(bodyParser.urlencoded({ extended: false }));


//CORS headers


nodeapp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
   next();   
});

// Routes which should handle requests
nodeapp.use("/user", userRoutes);
nodeapp.use("/equipments", equipmentsRoutes);
nodeapp.use('/requests',requestsRoutes);

nodeapp.get("/", (req, res, next) => {
  res.status(200).json({
  message: "hi"
});
});





nodeapp.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = nodeapp;
