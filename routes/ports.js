'use strict';

const express    = require('express');
const router     = express.Router();
const db         = require('../config/db.js');
const bodyParser = require('body-parser');


router.get('/:nat', function(req, res, next) {
  const nationality = req.params.nat;
  const query = `
        SELECT VoyageFrom AS Port
        FROM cleansedShipData
        WHERE Nationality = '${nationality}' AND VoyageFrom <> ''
        UNION
        SELECT VoyageTo AS Port
        FROM cleansedShipData
        WHERE Nationality = '${nationality}' AND VoyageTo <> ''`;

  db.query(query, function(err, results) {
      if (err) {
        return res.status(400).send(err);
      }
      res.send(results);
    });
});

module.exports = router;
