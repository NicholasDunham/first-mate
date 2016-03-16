'use strict';

// BASE SETUP
//
const path         = require('path');
const express      = require('express');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Node is running on port', app.get('port'));
});

