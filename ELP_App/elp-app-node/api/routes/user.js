const express = require("express");
const router = express.Router();
const db = require('../../dbconfig.js'); // Import the connection pool

router.post("/session", (req, res, next) => {
  const userid = req.body.userid;
  const inputpassword = req.body.password;
  db.query(`SELECT 
      users.user_id,
      users.password,
      users.role,
      user_names.name
    FROM users
    JOIN user_names on users.user_id = user_names.user_id
    WHERE users.user_id = ?`,
    [userid], (error, results) => {
      if (error) {
        console.error('Error executing parameterized query:', error);
        return;
      }
      var result = null;
      if (results.length > 0) {
        result = results[0];
      }
      console.log('User:', result);
      if ((result !== null) && (inputpassword == result.password)) {
        user_role = result.role;
        uname = result.name;
        const randomText = generateRandomText(10);
        user_token = userid + randomText;
        insertNewUserToken(userid, user_token);
        res.status(200).json({
          message: "Login successful",
          token: user_token,
          userid: req.body.userid,
          role: user_role,
          name: uname
        });
      }
      else {
        res.status(401).json();
      }
    });
});

router.delete("/session/current", (req, res, next) => {
  token = req.query.token
  db.query('UPDATE users SET token=null WHERE token = ?', [token], (error, results) => {
    if (error) {
      console.error('Error executing parameterized query:', error);
      return;
    }
    res.status(200).json();
  });
});

function generateRandomText(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function insertNewUserToken(userid, token) {
  db.query('UPDATE users SET token = ? WHERE user_id = ?', [token, userid], (error, results) => {
    if (error) {
      console.error('Error executing parameterized query:', error);
      return;
    }
    console.log(results);
  });
}

module.exports = router;