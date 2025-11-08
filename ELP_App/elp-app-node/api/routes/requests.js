const express = require("express");
const router = express.Router();
const db = require('../../dbconfig.js'); // Import the connection pool
const auth = require('../authenticate.js'); // Import Authenticate.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rs2305',
    database: 'elp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

router.get("/admin", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null) {
        res.status(401).json();
        return;
    }
    db.query(`SELECT 
            r.rqid, r.usid, r.reqtime, r.eid, r.approval_status, r.return_status, r.rettime, e.ename, e.availability,e.aid, u.name as requestor
        FROM req_management as r
        join equipments as e on r.eid=e.eqid
        join user_names as u on r.usid = u.user_id
        where e.aid = ? 
        order by reqtime desc
        `, [user.user_id], (error, results) => {
        if (error) {
            console.error('Error executing parameterized query:', error);
            return;
        }
        res.status(200).json(results);
    });
});


router.get("/user", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null) {
        res.status(401).json();
        return;
    }
    db.query(`SELECT 
            r.rqid, r.usid, r.reqtime, r.eid, r.approval_status, r.return_status, r.rettime, e.ename, e.availability, e.aid, u.name as approver
        FROM req_management as r
        join equipments as e on r.eid=e.eqid
        join user_names as u on e.aid = u.user_id
        where r.usid = ? 
        order by reqtime desc
        `, [user.user_id], (error, results) => {
        if (error) {
            console.error('Error executing parameterized query:', error);
            return;
        }
        res.status(200).json(results);
    });
});

router.post("/", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null) {
        res.status(401).json();
        return;
    }
    const eqid = req.body.eqid;

    db.query('INSERT INTO req_management(usid, eid, approval_status) VALUES (?, ?, ?)',
        [user.user_id, eqid, "pending"], (error, results) => {
            if (error) {
                console.error('Error executing parameterized query:', error);
                return;
            }
            res.status(201).json({
                message: "Request sent successfully"
            });
        });
});

router.patch("/:rqid/approval", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null || user.role !== "admin") {
        res.status(401).json();
        return;
    }
    const rqid = parseInt(req.params.rqid);
    const approval_status = req.body.approval_status;

    if (approval_status == "reject") {
        db.query('UPDATE req_management set approval_status = ? where rqid=?',
            [approval_status, rqid], (error, results) => {
                if (error) {
                    console.error('Error executing parameterized query:', error);
                    return;
                }
                res.status(200).json({
                    message: "Request updated successfully"
                });
            });
        return;
    }

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        console.log("Transaction started...");

        const [results, fields] = await connection.query('select r.eid, e.availability from req_management as r join equipments as e on r.eid=e.eqid where r.rqid=?',
            [rqid]
        );
        var result = results[0];
        console.log(result);
        if (result.availability == 0) {
            res.status(404).json();
            return;
        }

        await connection.query('update req_management set approval_status = ? where rqid=?',
            [approval_status, rqid]
        );
        await connection.query('update equipments set availability = availability - 1 where eqid=?',
            [result.eid]
        );

        await connection.commit();
        console.log("Transaction committed successfully.");
    } catch (error) {
        if (connection) {
            await connection.rollback();
            console.error("Transaction rolled back:", error.message);
        }
        throw error; // Re-throw the error
    } finally {
        // --- RELEASE CONNECTION BACK TO THE POOL ---
        if (connection) {
            // The connection is returned to the pool, it is not actually closed.
            connection.release();
            console.log("Connection released back to pool.");
        }
    }
    res.status(200).json({
        message: "Request updated successfully"
    });
});

router.patch("/:rqid/return", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null || user.role !== "admin") {
        res.status(401).json();
        return;
    }
    const rqid = parseInt(req.params.rqid);

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        console.log("Transaction started...");

        const [results, fields] = await connection.query('select r.eid, r.approval_status, r.return_status, e.availability from req_management as r join equipments as e on r.eid=e.eqid where r.rqid=?',
            [rqid]
        );
        var result = results[0];
        console.log(result);
        if (result.approval_status == 'pending' || result.return_status == 'returned') {
            res.status(405).json();
            return;
        }

        await connection.query('update req_management set return_status = ?, rettime=CURRENT_TIMESTAMP where rqid=?',
            ['returned', rqid]
        );
        await connection.query('update equipments set availability = availability + 1 where eqid=?',
            [result.eid]
        );

        await connection.commit();
        console.log("Transaction committed successfully.");
    } catch (error) {
        if (connection) {
            await connection.rollback();
            console.error("Transaction rolled back:", error.message);
        }
        throw error; // Re-throw the error
    } finally {
        // --- RELEASE CONNECTION BACK TO THE POOL ---
        if (connection) {
            // The connection is returned to the pool, it is not actually closed.
            connection.release();
            console.log("Connection released back to pool.");
        }
    }
    res.status(200).json({
        message: "Request updated successfully"
    });
});


module.exports = router;