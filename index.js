'use strict';

const path         = require('path');
const express      = require('express');
const bodyParser   = require('body-parser');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes:
app.use(express.static(path.join(__dirname, 'public')));
app.use('/seamen', require('./routes/seamen'));

app.listen(app.get('port'), function() {
  console.log('Node is running on port', app.get('port'));
});

