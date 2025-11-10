const express = require("express");
const router = express.Router();
const db = require('../../dbconfig.js'); // Import the connection pool

/**
 * API Documentation: user.js
 *
 * POST /session
 * Description: Authenticates a user and generates a session token.
 *
 * Request Body:
 * {
 *   "userid": "string",       // User ID of the user
 *   "password": "string"      // Password of the user
 * }
 *
 * Response:
 *   200 OK (Login successful)
 *   {
 *     "message": "Login successful",
 *     "token": "string",      // Generated session token
 *     "userid": "string",     // User ID
 *     "role": "string",       // Role of the user (e.g., admin, user)
 *     "name": "string"        // Name of the user
 *   }
 *
 *   401 Unauthorized (Invalid credentials)
 *
 * Error Handling:
 *   Logs errors to the console if the database query fails.
 *
 * DELETE /session/current
 * Description: Logs out the current user by invalidating their session token.
 *
 * Query Parameters:
 *   token (string): The session token to be invalidated.
 *
 * Response:
 *   200 OK (Logout successful)
 *   401 Unauthorized (If the token is invalid)
 *
 * Error Handling:
 *   Logs errors to the console if the database query fails.
 *
 * Utility Functions:
 * 1. generateRandomText(length)
 *    - Generates a random alphanumeric string of the specified length.
 *    - Used to create unique session tokens.
 *
 * 2. insertNewUserToken(userid, token)
 *    - Updates the users table to store the generated session token for the specified user.
 */

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