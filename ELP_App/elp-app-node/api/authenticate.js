const db = require('../dbconfig.js'); // Import the connection pool

const authenticate = (token) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from users where token = ? ', [token], (error, results) => {
            if (error) {
                console.error('Error executing parameterized query:', error);
                return reject(error);
            }
            console.log(results);

            var result = null;
            if (results.length > 0) {
                result = results[0];
            }

            resolve(result);
        });
    });
};

module.exports = authenticate;