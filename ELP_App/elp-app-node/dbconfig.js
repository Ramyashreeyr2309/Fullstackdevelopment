const mysql = require('mysql2');

    // Create a connection pool (recommended for better performance and resource management)
    const conn = mysql.createPool({
      host: 'localhost', // Or your MySQL server IP/hostname
      user: 'root',
      password: 'rs2305',
      database: 'elp',
      waitForConnections: true,
      connectionLimit: 10, // Adjust as needed
      queueLimit: 0
    });

    // Optional: Test the connection when the pool is created
    conn.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
      }
      console.log('Connected to MySQL database as ID', connection.threadId);
      connection.release(); // Release the connection back to the pool
    });

    module.exports = conn;