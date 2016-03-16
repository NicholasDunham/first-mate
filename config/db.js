'use strict';

const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_IP,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) {
    console.error('Error:', err);
  }
});

module.exports = connection;
