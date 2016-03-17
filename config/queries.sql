var mysql = require('mysql');

var profileObjects = [];
var cityList = [];
var nationalityList = [];
var shipList = [];


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

var setCity = function(){
var cityQuery = "select distinct(VoyageFrom) from cleansedShipData;";
var cleanerRegExp = /([[:space:]]|\d)/;	
connection.query(nationalityQuery.function(err, rows){
  nationalityList = rows.filter(function(row){
    if (row.toString().search(cleanerRegExp) !== -1){
      return row;
      }
      });
    });
  }

  var setNationality = function(){
  var nationalityQuery = "SELECT distinct(Nationality) from cleansedShipData;";
  var cleanerRegExp = /([[:space:]]|\d)/;	
  connection.query(nationalityQuery.function(err, rows){
    nationalityList = rows.filter(function(row){
      if (row.toString().search(cleanerRegExp) !== -1){
        return row;
        }
        });
      });
    }

    var listShipTypes = function(){
    var shipTypeQuery = "select distinct(ShipType) from cleansedShipData;";
    connection.query(shipTypeQuery, function(err, rows){
      shipList = rows.map(function(row){
        return shipList.push(row);
        });
      return shipList;
      });
    }
