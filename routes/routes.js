const express = require('express');
const log = require('../middleware/logger');
const { sendSuccess } = require('../utils/sendResponse');
const { getDescription } = require('../controllers/homeController');

const app = express();

app.use(log);

// Ping function
app.get('/ping', (_, res) => {
  sendSuccess(res, {
    'answer': 'Pong!'
  });
});

// Home page 
app.get('/profile/description', getDescription);

module.exports = app;