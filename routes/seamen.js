'use strict';

const express = require('express');
const router  = express.Router();
const db      = require('../config/db.js');

router.get('/:nat/:port', function(req, res, next) {
  const nationality = req.params.nat;
  const port = decodeURIComponent(req.params.port);
  const query = `
    SELECT DISTINCT(IF(LENGTH(Name1)>0, Name1, Name2)) AS Name,
    IF(LENGTH(Rank1)>0, Rank1, Rank2) AS Rank,
    Nationality, ShipName, ShipType,
    ROUND(SUM(Distance)/COUNT(*),2) AS avgDistance,
    SUM(WarsAndFights) AS totalWars
    FROM cleansedShipData
    WHERE (Nationality = '${nationality}')
    AND (VoyageFrom = '${port}' OR VoyageTo = '${port}')
    GROUP BY 1,2,3,4`;

  db.query(query, function(err, results) {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(results);
  });
});

module.exports = router;
