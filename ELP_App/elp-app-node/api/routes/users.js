const express = require("express");
const router = express.Router();

const db = require('./dbconfig.js'); // Import the connection pool

router.post("/login", (req, res, next) => {
    userid = req.body.userid;
    password = req.body.password;
    if((userid == "Sandhya") && (password == "123456")) {
        res.status(200).json({
        message: "Login done",
          token: "123445323",
          userid: req.body.userid
      });
    }
    else {
        res.status(401).json();
    }
    //console.log(req.body);
      
});

module.exports = router;