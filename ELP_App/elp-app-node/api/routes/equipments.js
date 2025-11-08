const express = require("express");
const router = express.Router();
const db = require('../../dbconfig.js'); // Import the connection pool
const auth = require('../authenticate.js'); // Import Authenticate.js

router.get("/details", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null) {
        res.status(401).json();
        return;
    }
    const category = req.body.category;
    const ename = req.body.ename;
    const availability = req.body.availability;
    const ecndtn = req.body.ecndtn;
    conditions = 'where true ';
    filters = [];
    if (category) {
        conditions += 'and category= ? ';
        filters.push(category);
    }
    if (ename) {
        conditions += 'and ename like ? ';
        filters.push("%" + ename + "%");
    }
    if (availability) {
        conditions += 'and availability > 0 ';
    }
    if (ecndtn) {
        conditions += 'and ecndtn= ? ';
        filters.push(ecndtn);
    }

    db.query('SELECT * FROM equipments ' + conditions, filters, (error, results) => {
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
    const ename = req.body.ename;
    const category = req.body.category;
    const ecndtn = req.body.ecndtn;
    const quantity = req.body.quantity;

    db.query('INSERT INTO equipments(ename, category, ecndtn, quantity, availability, aid) VALUES (?, ?, ?, ?, ?, ?)',
        [ename, category, ecndtn, quantity, quantity, user.user_id], (error, results) => {
            if (error) {
                console.error('Error executing parameterized query:', error);
                return;
            }
            res.status(201).json({
                message: "Equipment has been added successfully"
            });
        });
});

router.patch("/:eqid", async (req, res, next) => {
    token = req.query.token;
    user = await auth(token);
    if (user == null) {
        res.status(401).json();
        return;
    }
    const eqid = parseInt(req.params.eqid);
    const ename = req.body.ename;
    const category = req.body.category;
    const ecndtn = req.body.ecndtn;
    const new_quantity = req.body.new_quantity;
    const old_quantity = req.body.old_quantity;

    db.query(`update equipments set 
        ename=?, 
        category=?, 
        ecndtn=?,
        quantity=greatest(?,?-availability), 
        availability=availability+(quantity-?),
        aid=? 
        where eqid=?`,
        [ename, category, ecndtn, new_quantity, old_quantity, old_quantity, user.user_id, eqid], (error, results) => {
            if (error) {
                console.error('Error executing parameterized query:', error);
                return;
            }
            res.status(201).json({
                message: "Equipment has been updated successfully"
            });
        });
});

router.delete("/:eqid", async (req, res, next) => {
    const eqid = parseInt(req.params.eqid);
    token = req.query.token;
    user = await auth(token);
    if (user == null || user.role !== "admin") {
        res.status(401).json();
        return;
    }
    db.query('DELETE FROM equipments WHERE eqid = ?',
        [eqid], (error, results) => {
            if (error) {
                console.error('Error executing parameterized query:', error);
                return;
            }
            res.status(200).json({
                message: "Equipment has been deleted successfully"
            });
        });

});


module.exports = router;