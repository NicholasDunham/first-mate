'use strict';

const express = require('express');
const router  = express.Router();
const db      = require('../config/db.js');

router.get('/', function(req, res, next) {
  db.query('SELECT * FROM test_table', function(err, results) {
    if (err) {
      return res.status(400).send(err);
    }
    console.log('Success!');
    res.send(results);
  });
});

module.exports = router;
