'use strict';

const express = require('express');
const router  = express.Router();
const db      = require('../config/db.js');

/*
var fillProfiles = function(){
  var fullDistinctProfileList = "select distinct(Name1), Nationality, ShipName, ShipType, round(sum(distance)/count(*),2) as avgDistance, sum(WarsAndFights) as totalWars from cleansedShipData where Name1 NOT IN (SELECT distinct(Nationality) from cleansedShipData) group by 1,2,3,4;";
  connection.query(fullDistinctProfileList, function(err, rows){
    profileObjects = rows.map(function(row){
      var profile = {
      name        = row.Name1;
      nationality = row.Nationality;
      shipName    = row.ShipName;
      shipType    = row.ShipType;
      avgDistance = row.avgDistance;
      totalWars   = row.totalWars;
      }
      return profileObjects.push(profile);
    });
  });
};
*/

const seamenQuery = "select distinct(Name1), Nationality, ShipName, ShipType, round(sum(distance)/count(*),2) as avgDistance, sum(WarsAndFights) as totalWars from cleansedShipData where Name1 NOT IN (SELECT distinct(Nationality) from cleansedShipData) group by 1,2,3,4;";

router.get('/', function(req, res, next) {
  db.query(seamenQuery, function(err, results) {
    if (err) {
      return res.status(400).send(err);
    }
    console.log('Running query.');
    res.send(results);
  });
});

module.exports = router;
